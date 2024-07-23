namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using Microsoft.AspNetCore.Http;

	public interface IStudentService
	{
		Task Add(StudentFormDTO student, IFormFile roadmap);

		Task Edit(StudentFormDTO editForm);
		Task Delete(int id);
		Task<StudentFormDTO> Details(int id);

		Task<List<StudentFormDTO>> GetAll();
		Task<List<StudentFormDTO>> GetAllForMentors(int mentorId);

		void EditRoadMap(int id, List<Dictionary<string, string>> updatedData);

		List<Dictionary<string, object>> GetRoadMap(int id);

		Task<Student?> GetStudent(int id);
		Task<Student?> GetStudentByEmail(string email);
		Task DescreaseUnpaidLessosn(int id);
		Task IncreaseUnpaidLessons(int id);
	}
}
