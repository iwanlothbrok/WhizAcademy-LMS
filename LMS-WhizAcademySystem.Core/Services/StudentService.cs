using AutoMapper;
using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Core.Services.Interfaces;
using LMS_WhizAcademySystem.Infrastructure.Data;
using LMS_WhizAcademySystem.Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

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
            mapper.Map(student, studentForm);

            if (student == null)
            {
                throw new Exception("Student is null. Invalid Id");
            }

            student.Roadmap = null;

            return studentForm;
        }

        public async Task<List<StudentFormDTO>> GetAll()
        {
            var students = await _dbContext.Students.Include(s => s.Mentor).ToListAsync();

            var studentDTOs = mapper.Map<List<StudentFormDTO>>(students);

            return studentDTOs;
        }

        public byte[] GetRoadMap(int id)
        {
            throw new NotImplementedException();
        }
    }
}
