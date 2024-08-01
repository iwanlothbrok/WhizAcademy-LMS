namespace LMS_WhizAcademySystem.Server.Controllers
{
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/payment")]
    [ApiController]
    public class PaymentsApiController(IPaymentService paymentService) : ControllerBase
    {
        private readonly IPaymentService _paymentService = paymentService;

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
        public async Task<IActionResult> DeleteAsync(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {
                await this._paymentService.Delete(id);
            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }

        [HttpPut("decrease-lessons/{id}")]
        public async Task<IActionResult> DescreaseLessonsCompleted(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {
                await this._paymentService.DescreaseLessonsCompleted(id);
            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }


        [HttpPut("increase-lessons/{id}")]
        public async Task<IActionResult> IncreaseLessonsCompleted(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {
                await this._paymentService.IncreaseLessonsCompleted(id);
            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }
    }
}

