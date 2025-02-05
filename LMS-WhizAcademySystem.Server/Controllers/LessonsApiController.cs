﻿namespace LMS_WhizAcademySystem.Server.Controllers
{
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using System.Globalization;

    [Route("api/lessons")]
	[ApiController]
	public class LessonsApiController(ILessonService lessonService) : ControllerBase
	{
		private readonly ILessonService _lessonService = lessonService;
		const string format = "ddd MMM dd yyyy HH:mm:ss 'GMT'zzz '(Eastern European Summer Time)'";

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
				// Parse the date strings into DateTime objects
				model.StartingDate = ParseDateToBulgarianTime(model.StartingDateString, "Starting date is invalid.");
				model.EndingDate = ParseDateToBulgarianTime(model.EndingDateString, "Ending date is invalid.");

				// Call the service to add the lesson
				await _lessonService.Add(model);
			}
			catch (FormatException ex)
			{
				// Handle date parsing exceptions
				return BadRequest(ex.Message);
			}
			catch (InvalidOperationException ex)
			{
				// Handle other validation exceptions
				return BadRequest(ex.Message);
			}
			catch (Exception ex)
			{
				// Log the exception (consider using a logging library)
				// logger.LogError(ex, "An error occurred while adding the lesson.");
				return StatusCode(500, "An internal server error occurred.");
			}

			return Ok("Event added successfully");
		}

		[HttpGet("all")]
		public async Task<IEnumerable<LessonFormDTO>> GetAll()
		{
			return await _lessonService.GetAll();
		}


		private DateTime ParseDateToBulgarianTime(string dateString, string errorMessage)
		{
			try
			{
				// Parse the date string as a DateTime with unspecified kind
				DateTime unspecifiedDate = DateTime.ParseExact(dateString, format, CultureInfo.InvariantCulture);

				// Manually adjust for the Bulgarian time zone by adding the appropriate offset
				DateTime bulgarianLocalTime = unspecifiedDate.AddHours(3);

				// Convert the adjusted local time to UTC
				return bulgarianLocalTime.ToUniversalTime();
			}
			catch (FormatException)
			{
				// Throw a specific exception message if parsing fails
				throw new FormatException(errorMessage);
			}
		}
	}
}
