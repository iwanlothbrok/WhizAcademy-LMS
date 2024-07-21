namespace LMS_WhizAcademySystem.Server.Controllers
{
	using AutoMapper;
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Infrastructure.Data;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using Microsoft.AspNetCore.Mvc;

	[Route("api/event")]
	[ApiController]
	public class EventApiController : ControllerBase
	{
		public ApplicationDbContext data;
		public IMapper mapper;

		public EventApiController(ApplicationDbContext data)
		{
			this.data = data;
		}

		[HttpPost("add")] // api/mentors/add FROM QUERY
		public IActionResult Post([FromBody] EventFormDTO eventForm) //[
		{
			if (eventForm == null)
			{
				return BadRequest("Mentor is null.");
			}

			if (!ModelState.IsValid)
			{
				return BadRequest("Invalid ModelState.");
			}

			try
			{
				var eventModel = mapper.Map<Event>(eventForm);		

				data.Events.Add(eventModel);
			}
			catch (Exception)
			{
				return BadRequest();
			}

			return Ok("Mentor added successfully");
		}
	}
}
