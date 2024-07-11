namespace LMS_WhizAcademySystem.Server.Controllers
{
    using AutoMapper;
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using OfficeOpenXml;

    [Route("api/students")]
    [ApiController]
    public class StudentsApiController : ControllerBase
    {
        private readonly ApplicationDbContext data;
        private readonly IMapper mapper;

        public StudentsApiController(ApplicationDbContext data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;
        }

        // TODO: change the dto | add the student service
        [HttpPost("add")] // api/students/add
        public async Task<IActionResult> AddStudent([FromForm] StudentFormDTO student, IFormFile roadmap) //[
        {
            if (student == null)
            {
                return BadRequest("Mentor is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid ModelState.");
            }

            if (roadmap != null && roadmap.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await roadmap.CopyToAsync(memoryStream);
                    student.Roadmap = memoryStream.ToArray();
                }
            }


            Student stu = mapper.Map<Student>(student);

            // TODO: REMOVE DATA

            await this.data.Students.AddAsync(stu);
            await this.data.SaveChangesAsync();
            //try
            //{
            //    _mentorService.Add(mentor);
            //}
            //catch (Exception)
            //{
            //    return BadRequest();
            //}

            return Ok("Mentor added successfully");
        }

        [HttpGet("all")]
        public List<Student> GetAllStudents()
        {
            List<Student> students = this.data.Students.Include(x => x.Mentor).Include(x => x.Relative).ToList();

            List<StudentFormDTO> stu = mapper.Map<List<StudentFormDTO>>(students);


            //foreach (var x in students)
            //{
            //    x.Roadmap = [];
            //}
            return students;
        }

        [HttpGet("get/roadmap/{id}")]
        public IActionResult GetRoadmap(int id) // int id
        {
            try
            {
                // Fetch the byte array from the database
                var excelBytes = data.Students.FirstOrDefault(x => x.Id == id)?.Roadmap;
                if (excelBytes == null)
                {
                    return NotFound(new { message = "Student not found or roadmap is empty." });
                }

                // Save the byte array as an Excel file
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFile.xlsx");
                System.IO.File.WriteAllBytes(filePath, excelBytes);


                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                // Process the Excel file and convert it to JSON
                var jsonData = new List<Dictionary<string, object>>();
                using (var package = new ExcelPackage(new FileInfo(filePath)))
                {
                    var worksheet = package.Workbook.Worksheets[0];
                    var rowCount = worksheet.Dimension.Rows;
                    var colCount = worksheet.Dimension.Columns;

                    for (int row = 2; row <= rowCount; row++) // Assuming the first row is the header
                    {
                        var rowDict = new Dictionary<string, object>();
                        for (int col = 1; col <= colCount; col++)
                        {
                            var key = worksheet.Cells[1, col].Text; // Header as key
                            var value = worksheet.Cells[row, col].Text;
                            rowDict[key] = string.IsNullOrWhiteSpace(value) ? "NaN" : value; // Replace empty cells with "NaN"
                        }
                        jsonData.Add(rowDict);
                    }
                }

                return Ok(jsonData);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("update/{id}")]
        public IActionResult UpdateExcelData(int id, [FromBody] List<Dictionary<string, string>> updatedData)
        {
            try
            {
                // Fetch the byte array from the database
                var excelBytes = data.Students.FirstOrDefault(x => x.Id == id)?.Roadmap;
                if (excelBytes == null)
                {
                    return NotFound(new { message = "Student not found or roadmap is empty." });
                }

                // Set the license context
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                // Update the Excel file with the new data
                using (var package = new ExcelPackage(new MemoryStream(excelBytes)))
                {
                    var worksheet = package.Workbook.Worksheets[0];

                    // Update the worksheet with the new data
                    for (int row = 0; row < updatedData.Count; row++)
                    {
                        var rowDict = updatedData[row];
                        int col = 1;
                        foreach (var key in rowDict.Keys)
                        {
                            worksheet.Cells[row + 2, col].Value = rowDict[key];
                            col++;
                        }
                    }

                    // Save the updated Excel file
                    var memoryStream = new MemoryStream();
                    package.SaveAs(memoryStream);
                    excelBytes = memoryStream.ToArray();

                    // Update the byte array in the database
                    var student = data.Students.FirstOrDefault(x => x.Id == id);
                    if (student != null)
                    {
                        student.Roadmap = excelBytes;
                        data.SaveChanges();
                    }
                }

                return Ok(new { message = "Excel file updated successfully." });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}