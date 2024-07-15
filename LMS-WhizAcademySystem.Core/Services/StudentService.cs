using AutoMapper;
using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Core.Services.Interfaces;
using LMS_WhizAcademySystem.Infrastructure.Data;
using LMS_WhizAcademySystem.Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace LMS_WhizAcademySystem.Core.Services
{
	public class StudentService : IStudentService
	{
		private readonly ApplicationDbContext _dbContext;
		private readonly IMapper mapper;

		public StudentService(ApplicationDbContext dbContext, IMapper mapper)
		{
			this._dbContext = dbContext;
			this.mapper = mapper;
		}
		public async void Add(StudentFormDTO student, IFormFile roadmap)
		{
			if (roadmap != null && roadmap.Length > 0)
			{
				using (var memoryStream = new MemoryStream())
				{
					await roadmap.CopyToAsync(memoryStream);
					student.Roadmap = memoryStream.ToArray();
				}
			}
			else
			{
				throw new Exception("Error in roadmap!");
			}

			try
			{
				Student stu = mapper.Map<Student>(student);

				//TODO Error in save changes. Trying to access a disposed dbContext.

				this._dbContext.Students.Add(stu);
				this._dbContext.SaveChanges();

			}
			catch (Exception ex)
			{
				throw new Exception("Error in mapping or adding new student!");
			}

		}

		public void Delete(int id)
		{
			Student? student = this._dbContext.Students.FirstOrDefault(x => x.Id == id);

			if (student == null)
			{
				throw new Exception("Student is null. Invalid Id!");
			}

			this._dbContext.Students.Remove(student);
			this._dbContext.SaveChanges();
		}

		public void Update(int id)
		{
			throw new NotImplementedException();
		}


		public async Task<StudentFormDTO> Details(int id)
		{
			var student = await this._dbContext.Students.FirstOrDefaultAsync(x => x.Id == id);

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
	}
}
