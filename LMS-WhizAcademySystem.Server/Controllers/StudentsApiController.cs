namespace LMS_WhizAcademySystem.Server.Controllers
{
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using LMS_WhizAcademySystem.Core.DTOs;
    using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> AddStudent([FromForm] StudentFormDTO student, IFormFile roadmap)
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
                await this._studentService.Add(student, roadmap);
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


        [HttpGet("all/mentor/{id}")]
        public async Task<List<StudentFormDTO>> GetStudentsForMentor(int id)
        {
            List<StudentFormDTO> students = await this._studentService.GetAllForMentors(id);

            foreach (var s in students)
            {
                s.Roadmap = null;
            }
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

        [HttpGet("get/roadmap/{id}")]
        public IActionResult GetRoadmap(int id) // int id
        {
            try
            {
                var jsonData = this._studentService.GetRoadMap(id);
                return Ok(jsonData);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("update/{id}")]
        public IActionResult UpdateExcelData(int id, [FromBody] List<Dictionary<string, string>> updatedData)
        {
            try
            {
                this._studentService.EditRoadMap(id, updatedData);
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }
        [HttpPut("decrease-lessons/{id}")]
        public IActionResult DescreaseLessonsCompleted(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {
            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }


        [HttpPut("increase-lessons/{id}")]
        public IActionResult IncreaseLessonsCompleted(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {

            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }
    }
}