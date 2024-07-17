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

<<<<<<< HEAD
            return Ok("Payment added successfully");
        }
=======
            // TODO: REMOVE DATA
>>>>>>> bdb4f2915e6bc48832dee12b12df1a2abed8a9d3

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

<<<<<<< HEAD
=======
        [HttpGet("all")] // api/payment/add
        public List<PaymentInformationDTO> All() //[
        {
            var payments = this.data.Payments.Include(m => m.Mentor).Include(s => s.Student).Include(r => r.Student.Relative).ToList();

            var paymentsDtos = mapper.Map<List<PaymentInformationDTO>>(payments);

            foreach (var p in paymentsDtos)
            {
                p.Student.Roadmap = null;
            }
            // var paymentEntity = mapper.Map<Payment>(payment);

            // TODO: REMOVE DATA

            return paymentsDtos;
        }


        [HttpPut("decrease-lessons/{id}")]
        public IActionResult DescreaseLessonsCompleted(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {
                var payment = this.data.Payments.FirstOrDefault(x => x.Id == id);

                if (payment == null || payment.LessonsCompleted == 0)
                {
                    return BadRequest();
                }

                payment.LessonsCompleted--;


                this.data.SaveChanges();
            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }


        [HttpPut("increase-lessons/{id}")]
        public IActionResult IncreaseLessonsCompleted(int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            try
            {
                var payment = this.data.Payments.FirstOrDefault(x => x.Id == id);

                if (payment == null)
                {
                    return BadRequest();
                }

                payment.LessonsCompleted++;


                this.data.SaveChanges();
            }
            catch (Exception)
            {
                return BadRequest("Error in deleting student in Student Service.");
            }

            return Ok();
        }
>>>>>>> bdb4f2915e6bc48832dee12b12df1a2abed8a9d3
    }
}

