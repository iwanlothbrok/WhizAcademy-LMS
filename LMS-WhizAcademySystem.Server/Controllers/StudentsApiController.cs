namespace LMS_WhizAcademySystem.Server.Controllers
{
    using AutoMapper;
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using static Org.BouncyCastle.Math.EC.ECCurve;

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
            FileContentResult a = File(students[0].Roadmap, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "roadmap.xlsx");

            return students;
        }
    }
}