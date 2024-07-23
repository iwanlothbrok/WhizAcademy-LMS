namespace LMS_WhizAcademySystem.Server.Controllers
{
	using AutoMapper;
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Infrastructure.Data;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using Microsoft.AspNetCore.Mvc;

	[Route("api/lesson")]
	[ApiController]
	public class LessonsApiController : ControllerBase
	{
		private readonly ApplicationDbContext _data;
		private readonly IMapper _mapper;

		public LessonsApiController(ApplicationDbContext data, IMapper mapper)
		{
			_data = data;
			_mapper = mapper;
		}

		[HttpPost("add")] // api/event/add
		public IActionResult Post([FromBody] LessonFormDTO eventForm)
		{
			if (eventForm == null)
			{
				return BadRequest("Event form is null.");
			}

			if (!ModelState.IsValid)
			{
				return BadRequest("Invalid ModelState.");
			}

			try
			{
				var eventModel = _mapper.Map<Lesson>(eventForm);

				var mentor = _data.Mentors.FirstOrDefault(x => x.Email == eventForm.MentorEmail);
				var student = _data.Students.FirstOrDefault(x => x.Email == eventForm.StudentEmail);

				if (mentor == null || student == null)
				{
					return BadRequest();
				}

				eventModel.StudentId = 1;
				eventModel.MentorId = 1;
				//_data.Events.Add(eventModel);
				//_data.SaveChanges(); // Ensure changes are saved to the database
			}
			catch (Exception)
			{
				return BadRequest();
			}

			return Ok("Event added successfully");
		}
	}
}
