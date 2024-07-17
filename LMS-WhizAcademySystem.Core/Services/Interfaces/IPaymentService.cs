using LMS_WhizAcademySystem.Core.DTOs;

namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
    public interface IPaymentService
    {
        Task Add(PaymentFormDTO payment);

        Task<IEnumerable<PaymentInformationDTO>> GetAll();
    }
}
