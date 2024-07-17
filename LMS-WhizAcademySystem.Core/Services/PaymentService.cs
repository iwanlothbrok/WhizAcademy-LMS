using AutoMapper;
using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Core.Services.Interfaces;
using LMS_WhizAcademySystem.Infrastructure.Data;
using LMS_WhizAcademySystem.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace LMS_WhizAcademySystem.Core.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public PaymentService(ApplicationDbContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._mapper = mapper;
        }
        public async Task Add(PaymentFormDTO payment)
        {
            try
            {
                if (payment.FirstLessonDate > payment.LastLessonDate)
                {
                    throw new InvalidDataException("Wrong dates for first and last lesson!");
                }

                var paymentEntity = _mapper.Map<Payment>(payment);

                paymentEntity.PaymentDate = DateTime.UtcNow;

                await this._dbContext.Payments.AddAsync(paymentEntity);
                await this._dbContext.SaveChangesAsync();
            }
            catch (InvalidDataException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new Exception("Error in adding payment");
            }
        }

        public async Task<IEnumerable<PaymentInformationDTO>> GetAll()
        {
            var payments =  await this._dbContext.Payments
                .Include(m => m.Mentor)
                .Include(s => s.Student)
                .Include(r => r.Student.Relative)
                .ToListAsync();

            var paymentsDtos = _mapper.Map<List<PaymentInformationDTO>>(payments);

            foreach (var p in paymentsDtos)
            {
                p.Student.Roadmap = null;
            }

            // var paymentEntity = mapper.Map<Payment>(payment);
            return paymentsDtos;
        }
    }
}
