using LMS_WhizAcademySystem.Core.Services.Interfaces;

namespace LMS_WhizAcademySystem.Server.Controllers
{
	using AutoMapper;
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Infrastructure.Data;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.EntityFrameworkCore;
	using OfficeOpenXml;

	[Route("api/students")]
	[ApiController]
	public class StudentsApiController : ControllerBase
	{
		private readonly IStudentService _studentService;

		public StudentsApiController(IStudentService studentService)
		{
			this._studentService = studentService;
		}

		// TODO: change the dto | add the student service
		[HttpPost("add")] // api/students/add
		public async Task<IActionResult> AddStudent([FromForm] StudentFormDTO student, IFormFile roadmap) //[
		{
			if (student == null)
			{
				return BadRequest("Student is null.");
			}

			if (!ModelState.IsValid)
			{
				return BadRequest("Invalid ModelState.");
			}
			try
            { 
                this._studentService.Add(student, roadmap);
            }
			catch (Exception)
			{
			    return BadRequest("Error adding student in Student Service.");
			}

			return Ok("Student added successfully");
		}

		[HttpGet("all")]
		public async Task<List<StudentFormDTO>> GetAllStudents()
        {
            List<StudentFormDTO> students = await this._studentService.GetAll();
			return students;
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			if (id < 0)
			{
				return BadRequest();
			}

			try
			{
				this._studentService.Delete(id);
			}
			catch (Exception)
			{
				return BadRequest("Error in deleting student in Student Service.");
			}

			return Ok();
		}


        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetStudentDetailsAsync(int id)
        {
            StudentFormDTO student = null;
            try
            {
                student = await this._studentService.Details(id);
            }
            catch (Exception)
            {
                return BadRequest("Error in finding Student details. Invalid id.");
            }

            return Ok(student);
        }

        //[HttpGet("get/roadmap/{id}")]
        //public IActionResult GetRoadmap(int id) // int id
        //{
        //	try
        //	{
        //		// Fetch the byte array from the database
        //		var excelBytes = data.Students.FirstOrDefault(x => x.Id == id)?.Roadmap;
        //		if (excelBytes == null)
        //		{
        //			return NotFound(new { message = "Student not found or roadmap is empty." });
        //		}

        //		// Save the byte array as an Excel file
        //		var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFile.xlsx");
        //		System.IO.File.WriteAllBytes(filePath, excelBytes);


        //		ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        //		// Process the Excel file and convert it to JSON
        //		var jsonData = new List<Dictionary<string, object>>();
        //		using (var package = new ExcelPackage(new FileInfo(filePath)))
        //		{
        //			var worksheet = package.Workbook.Worksheets[0];
        //			var rowCount = worksheet.Dimension.Rows;
        //			var colCount = worksheet.Dimension.Columns;

        //			for (int row = 2; row <= rowCount; row++) // Assuming the first row is the header
        //			{
        //				var rowDict = new Dictionary<string, object>();
        //				for (int col = 1; col <= colCount; col++)
        //				{
        //					var key = worksheet.Cells[1, col].Text; // Header as key
        //					var value = worksheet.Cells[row, col].Text;
        //					rowDict[key] = string.IsNullOrWhiteSpace(value) ? "NaN" : value; // Replace empty cells with "NaN"
        //				}
        //				jsonData.Add(rowDict);
        //			}
        //		}

        //		return Ok(jsonData);
        //	}
        //	catch (System.Exception ex)
        //	{
        //		return BadRequest(new { message = ex.Message });
        //	}
        //}

        //[HttpPost("update/{id}")]
        //public IActionResult UpdateExcelData(int id, [FromBody] List<Dictionary<string, string>> updatedData)
        //{
        //	try
        //	{
        //		// Fetch the byte array from the database
        //		var excelBytes = data.Students.FirstOrDefault(x => x.Id == id)?.Roadmap;
        //		if (excelBytes == null)
        //		{
        //			return NotFound(new { message = "Student not found or roadmap is empty." });
        //		}

        //		// Set the license context
        //		ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        //		// Update the Excel file with the new data
        //		using (var package = new ExcelPackage(new MemoryStream(excelBytes)))
        //		{
        //			var worksheet = package.Workbook.Worksheets[0];

        //			// Update the worksheet with the new data
        //			for (int row = 0; row < updatedData.Count; row++)
        //			{
        //				var rowDict = updatedData[row];
        //				int col = 1;
        //				foreach (var key in rowDict.Keys)
        //				{
        //					worksheet.Cells[row + 2, col].Value = rowDict[key];
        //					col++;
        //				}
        //			}

        //			// Save the updated Excel file
        //			var memoryStream = new MemoryStream();
        //			package.SaveAs(memoryStream);
        //			excelBytes = memoryStream.ToArray();

        //			// Update the byte array in the database
        //			var student = data.Students.FirstOrDefault(x => x.Id == id);
        //			if (student != null)
        //			{
        //				student.Roadmap = excelBytes;
        //				data.SaveChanges();
        //			}
        //		}

        //		return Ok(new { message = "Excel file updated successfully." });
        //	}
        //	catch (System.Exception ex)
        //	{
        //		return BadRequest(new { message = ex.Message });
        //	}
        //}


    }
}