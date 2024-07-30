namespace LMS_WhizAcademySystem.Core.Services
{
    using global::AutoMapper;
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using OfficeOpenXml;

    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper mapper;

        public StudentService(ApplicationDbContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this.mapper = mapper;
        }
        public async Task Add(StudentFormDTO student, IFormFile? roadmap)
        {
            if (roadmap != null && roadmap.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await roadmap.CopyToAsync(memoryStream);
                    student.Roadmap = memoryStream.ToArray();
                }
            }

            try
            {
                Student stu = mapper.Map<Student>(student);

                //TODO Error in save changes. Trying to access a disposed dbContext.

                await this._dbContext.Students.AddAsync(stu);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error in mapping or adding new student!");
            }
        }

        public async Task Delete(int id)
        {
            Student? student = await GetStudent(id) ?? throw new Exception("Student is null. Invalid Id!");

            this._dbContext.Students.Remove(student);
            await this._dbContext.SaveChangesAsync();
        }

        public async Task Edit(StudentFormDTO editForm)
        {
            try
            {
                Student? student = await GetStudent(editForm.Id) ?? throw new Exception("Student is null, invalid id.");

                if (string.IsNullOrWhiteSpace(editForm.Name) ||
                    string.IsNullOrWhiteSpace(editForm.Email))
                {
                    throw new Exception("Null value passed in form.");
                }

                //TODO discuss with ivan what do we want to edit - roadmap/events//lessons/mentors/relatives
                student.Name = editForm.Name;
                student.Email = editForm.Email;
                student.Address = editForm.Address;
                student.PhoneNumber = editForm.PhoneNumber;
                student.PriceForHour = editForm.PriceForHour;
                student.MentorId = editForm.MentorId;

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<StudentFormDTO> Details(int id)
        {
            var student = await GetStudent(id);

            StudentFormDTO studentForm = null;

            // mapper.Map(student, studentForm);
            var studentDto = mapper.Map<StudentFormDTO>(student);

            if (student == null)
            {
                throw new Exception("Student is null. Invalid Id");
            }

            student.Roadmap = null;

            return studentDto;
        }

        public async Task<List<StudentFormDTO>> GetAll()
        {
            var students = await _dbContext.Students.Include(s => s.Mentor).ToListAsync();

            var studentDTOs = mapper.Map<List<StudentFormDTO>>(students);

            return studentDTOs;
        }

        public async Task<List<StudentFormDTO>> GetAllForMentors(int mentorId)
        {
            var students = await _dbContext.Students.Where(x => x.MentorId == mentorId).ToListAsync();

            var studentDTOs = mapper.Map<List<StudentFormDTO>>(students);

            return studentDTOs;
        }

        public List<Dictionary<string, object>> GetRoadMap(int id)
        {
            var excelBytes = this._dbContext.Students.FirstOrDefault(x => x.Id == id)?.Roadmap;
            if (excelBytes == null)
            {
                throw new Exception("Student not found or roadmap is empty.");
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFile.xlsx");
            File.WriteAllBytes(filePath, excelBytes);

            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;

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

            return jsonData;
        }

        public void EditRoadMap(int id, List<Dictionary<string, string>> updatedData)
        {
            try
            {
                // Fetch the byte array from the database
                var excelBytes = _dbContext.Students.FirstOrDefault(x => x.Id == id)?.Roadmap;
                if (excelBytes == null)
                {
                    throw new Exception("Student not found or roadmap is empty.");
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
                    var student = _dbContext.Students.FirstOrDefault(x => x.Id == id);
                    if (student != null)
                    {
                        student.Roadmap = excelBytes;
                        _dbContext.SaveChanges();
                    }
                }


            }
            catch (System.Exception ex)
            {
                throw new Exception("Student not found or roadmap is empty.");
            }
        }

        public async Task<Student?> GetStudent(int id) => await this._dbContext.Students.FirstOrDefaultAsync(x => x.Id == id);

        public async Task DescreaseUnpaidLessosn(int id)
        {
            var student = await this.GetStudent(id);

            if (student == null || student.UnpaidLessons == 0)
            {
                throw new Exception();
            }

            student.UnpaidLessons--;

            await this._dbContext.SaveChangesAsync();
        }

        public async Task IncreaseUnpaidLessons(int id)
        {
            var student = await this.GetStudent(id) ?? throw new Exception();

            student.UnpaidLessons++;

            await this._dbContext.SaveChangesAsync();
        }

        public async Task AddRelative(int studentId, int relativeId)
        {
            var student = await GetStudent(studentId) ?? throw new Exception("Student is null, invalid id.");

            student.RelativeId = relativeId;
            await this._dbContext.SaveChangesAsync();
        }

        public async Task<Student?> GetStudentByEmail(string email) => await this._dbContext.Students.FirstOrDefaultAsync(x => x.Email == email);
    }
}
