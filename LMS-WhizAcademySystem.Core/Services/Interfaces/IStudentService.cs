using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Infrastructure.Models;
using Microsoft.AspNetCore.Http;

namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
	public interface IStudentService
	{
		public void Add(StudentFormDTO student, IFormFile roadmap);

		public void Update(int id);
		public void Delete(int id);
		public Task<StudentFormDTO> Details(int id);

		public Task<List<StudentFormDTO>> GetAll();
		public Task<List<StudentFormDTO>> GetAllForMentors(int mentorId);


		public List<Dictionary<string, object>> GetRoadMap(int id);
	}
}
