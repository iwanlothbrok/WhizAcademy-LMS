namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Infrastructure.Models;

    public interface IPaymentService
    {
        Task Add(PaymentFormDTO payment);

        Task<IEnumerable<PaymentInformationDTO>> GetAll();

        Task Delete(int id);

        Task DescreaseLessonsCompleted(int id);

        Task IncreaseLessonsCompleted(int id);

        Task<Payment?> GetPayment(int id);
    }
}
