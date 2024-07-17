using AutoMapper;
using LMS_WhizAcademySystem.Core.Services.Interfaces;

namespace LMS_WhizAcademySystem.Server.Controllers
{
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/payment")]
    [ApiController]
    public class PaymentApiController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentApiController(IPaymentService paymentService)
        {
            this._paymentService = paymentService;
        }

        [HttpPost("add")] // api/payment/add
        public async Task<IActionResult> Add([FromForm] PaymentFormDTO payment) //[
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Error in model state.");
            }

            try
            {
                await this._paymentService.Add(payment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok("Payment added successfully");
        }

        [HttpGet("all")] // api/payment/add
        public async Task<IEnumerable<PaymentInformationDTO>> All() //[
        {
            var payments = await this._paymentService.GetAll();

            return payments;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {
                var payment = this.data.Payments.FirstOrDefault(x => x.Id == id);
                this.data.Payments.Remove(payment);
                this.data.SaveChanges();
            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }

    }
}

