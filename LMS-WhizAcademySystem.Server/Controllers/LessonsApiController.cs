namespace LMS_WhizAcademySystem.Server.Controllers
{
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Core.Services.Interfaces;
	using LMS_WhizAcademySystem.Server.Models;
	using Microsoft.AspNetCore.Mvc;

	[Route("api/lesson")]
	[ApiController]
	public class LessonsApiController : ControllerBase
	{
		private ILessonService _lessonService;

		public LessonsApiController(ILessonService lessonService)
		{
			_lessonService = lessonService;
		}

		[HttpPost("add")] // api/event/add
		public async Task<IActionResult> Post([FromBody] LessonFormDTO model)
		{
			if (model == null)
			{
				return BadRequest("Event form is null.");
			}

			if (!ModelState.IsValid)
			{
				return BadRequest("Invalid ModelState.");
			}

			try
			{
				await _lessonService.Add(model);
			}
			catch (Exception)
			{
				return BadRequest();
			}

			return Ok("Event added successfully");
		}

		[HttpGet("all")]
		public async Task<IEnumerable<LessonFormDTO>> GetAll()
		{
			return await _lessonService.GetAll();
		}
	}
}
