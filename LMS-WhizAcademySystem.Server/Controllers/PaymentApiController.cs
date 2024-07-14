namespace LMS_WhizAcademySystem.Server.Controllers
{
	using AutoMapper;
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Infrastructure.Data;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using Microsoft.AspNetCore.Mvc;
	using System.Threading.Tasks;

	[Route("api/payment")]
	[ApiController]
	public class PaymentApiController : ControllerBase
	{
		private readonly ApplicationDbContext data;
		private readonly IMapper mapper;

		public PaymentApiController(ApplicationDbContext data, IMapper mapper)
		{
			this.data = data;
			this.mapper = mapper;
		}

		[HttpPost("add")] // api/payment/add
		public IActionResult Add([FromForm] PaymentFormDTO payment) //[
		{

			var paymentEntity = mapper.Map<Payment>(payment);

			// TODO: REMOVE DATA
			paymentEntity.PaymentDate = DateTime.UtcNow;

			 this.data.Payments.Add(paymentEntity);
			 this.data.SaveChanges();

			return Ok("Mentor added successfully");
		}
	}
}

