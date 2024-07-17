using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Infrastructure.Models;
using Microsoft.AspNetCore.Http;

namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
    public interface IStudentService
    {
        public Task Add(StudentFormDTO student, IFormFile roadmap);

        public Task Update(int id);
        public Task Delete(int id);
        public Task<StudentFormDTO> Details(int id);

        public Task<List<StudentFormDTO>> GetAll();
        public Task<List<StudentFormDTO>> GetAllForMentors(int mentorId);

        public void EditRoadMap(int id, List<Dictionary<string, string>> updatedData);

        public List<Dictionary<string, object>> GetRoadMap(int id);
    }
}
