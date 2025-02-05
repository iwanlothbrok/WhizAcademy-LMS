﻿namespace LMS_WhizAcademySystem.Server.Controllers
{
	using LMS_WhizAcademySystem.Core.DTOs;
	using Core.Services.Interfaces;
	using Microsoft.AspNetCore.Mvc;
	using Models;

	[Route("api/mentors")]
	[ApiController]
	public class MentorsApiController(IMentorService mentorService) : ControllerBase
	{
		private readonly IMentorService _mentorService = mentorService;

        // GET: api/mentors/all
        [HttpGet("all")]
		public async Task<IEnumerable<MentorInformationDTO>> Get()
		{
			IEnumerable<MentorInformationDTO> mentors =  await _mentorService.GetAll();

			return mentors;
		}

		[HttpPost("add")] // api/mentors/add FROM QUERY
		public IActionResult Post( [FromBody] MentorFormDTO mentor) //[
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
				_mentorService.Add(mentor);
			}
			catch (Exception)
			{
				return BadRequest();
			}

			return Ok("Mentor added successfully");
		}


		// GET api/mentors/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			var mentor = _mentorService.GetById(id);

			if (mentor == null)
			{
				return BadRequest();
			}

			return Ok(mentor);
		}

		[HttpPut("edit")] // api/mentors/edit
		public async Task<IActionResult> Edit([FromBody] MentorEditDTO editForm)
		{
			if (editForm == null)
			{
				return BadRequest();
			}

			if (!ModelState.IsValid)
			{
				return BadRequest();
			}

			try
			{
				await _mentorService.Edit(editForm);
			}
			catch (Exception e)
			{
				return BadRequest("Error in mentor update");
			}

			return Ok("Mentor updated successfully");
		}

		//// PUT api/<MentorsApiController>/5
		//[HttpPut("{id}")]
		//public void Put(int id, [FromBody] string value)
		//{
		//}

		// DELETE api/mentor/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAsync(int id)
		{
			if (id < 0)
			{
				return BadRequest();
			}

			try
			{
				await _mentorService.Delete(id);
			}
			catch (Exception)
			{
				return BadRequest();
			}

			return Ok();
		}
	}
}
