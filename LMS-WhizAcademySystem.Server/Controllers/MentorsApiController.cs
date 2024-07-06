// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LMS_WhizAcademySystem.Server.Controllers
{
	using Microsoft.AspNetCore.Mvc;

	[Route("api/mentors")]
	[ApiController]
	public class MentorsApiController : ControllerBase
	{
		// GET: api/mentors
		[HttpGet]
		public IEnumerable<string> Get()
		{
			return new string[] { "value1", "value2" };
		}

		// GET api/mentors/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/mentors/add
		[HttpPost(Name ="add")]
		public void Post([FromBody] string value)
		{
			;
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
