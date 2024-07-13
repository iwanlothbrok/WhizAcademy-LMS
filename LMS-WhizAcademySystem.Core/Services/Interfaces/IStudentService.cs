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
        public Student Details(int id);

        public List<Student> GetAll();

        public byte[] GetRoadMap(int id);
    }
}
