// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LMS_WhizAcademySystem.Server.Controllers
{
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using LMS_WhizAcademySystem.Server.Models;
	using Microsoft.AspNetCore.Mvc;

	[Route("api/mentors")]
	[ApiController]
	public class MentorsApiController : ControllerBase
	{
		// GET: api/mentors/all
		[HttpGet("all")]
		public IEnumerable<MentorInformationDTO> Get()
		{
			MentorInformationDTO mentor = new MentorInformationDTO()
			{
				Email = "pepi@abv.bg",
				Name = "Pepi",
				EarnedMoney = 15000,
				LastLessonDate = DateTime.Now,
				LessonsCount = 15,
			};

			List<MentorInformationDTO> mentors = new List<MentorInformationDTO>
			{
				mentor
			};

			return mentors;
		}

		// GET api/mentors/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		[HttpPost("add")] // api/mentors/add
		public IActionResult Post([FromBody] MentorFormDTO mentor) //[
		{
			//if (mentor == null)
			{
				return BadRequest("Mentor is null");
			}

			// Add mentor to the database (this part is not implemented in this example)
			// _context.Mentors.Add(mentor);
			// _context.SaveChanges();

			return Ok("Mentor added successfully");
		}

		// PUT api/<MentorsApiController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<MentorsApiController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
