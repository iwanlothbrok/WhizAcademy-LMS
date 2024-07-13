namespace LMS_WhizAcademySystem.Server.Controllers
{
	using AutoMapper;
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Infrastructure.Data;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Mvc;

	[Route("api/[controller]")]
	[ApiController]
	public class PaymentApiController : ControllerBase
	{
		private readonly ApplicationDbContext data;

		public PaymentApiController(ApplicationDbContext data)
		{
			this.data = data;
		}

		[HttpPost("add")] // api/payment/add
		public async Task<IActionResult> Add([FromForm] Payment payment) //[
		{

			//Student stu = mapper.Map<Student>(student);

			// TODO: REMOVE DATA

			//await this.data.Students.AddAsync(stu);
			//await this.data.SaveChangesAsync();

			return Ok("Mentor added successfully");
		}
	}
}

