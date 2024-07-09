namespace LMS_WhizAcademySystem.Server.Controllers
{
    using LMS_WhizAcademySystem.Core.DTOs;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/students")]
    [ApiController]
    public class StudentsApiController : ControllerBase
    {

        // TODO: change the dto | add the student service
        [HttpPost("add")] // api/students/add
        public async Task<IActionResult> AddStudent([FromForm] StudentFormDTO mentor, IFormFile roadmap) //[
        {
            if (mentor == null)
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
                    mentor.Roadmap = memoryStream.ToArray();
                }
            }

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

    }
}