namespace LMS_WhizAcademySystem.Server.Controllers
{
	using Models;
	using Microsoft.AspNetCore.Mvc;
    using Core.Services.Interfaces;
    using Core.Services;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNet.Identity;

    [Route("api/mentors")]
	[ApiController]
	public class MentorsApiController : ControllerBase
    {
        private readonly IMentorService _mentorService;

        public MentorsApiController(IMentorService mentorService)
        {
            this._mentorService = mentorService;
        }
        
		// GET: api/mentors/all
		[HttpGet("all")]
		public IEnumerable<MentorInformationDTO> Get()
		{
			//MentorInformationDTO mentor = new MentorInformationDTO()
			//{
			//	Email = "pepi@abv.bg",
			//	Name = "Pepi",
			//	EarnedMoney = 15000,
			//	LastLessonDate = DateTime.Now,
			//	LessonsCount = 15,
			//};

            IEnumerable<MentorInformationDTO> mentors = _mentorService.GetAll();

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
			if (mentor == null)
			{
				return BadRequest("Mentor is null.");
			}

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid ModelState.");
            }

            try
            {
                PasswordHasher hasher = new PasswordHasher();
                mentor.Password = hasher.HashPassword(mentor.Password);

                _mentorService.Add(mentor);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
				//TODO handle exception properly
                throw;
            }

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
