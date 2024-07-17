using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Infrastructure.Models;
using LMS_WhizAcademySystem.Server.Models;

namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
    public interface IMentorService
    {
        public Task Add(MentorFormDTO mentorForm);

        public Task Edit(MentorEditDTO editForm);

        public Task Delete(int id);

        public Mentor? GetById(int id);

        public Task<IEnumerable<MentorInformationDTO>> GetAll();
    }
}
