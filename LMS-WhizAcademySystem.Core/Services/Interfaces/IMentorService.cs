using LMS_WhizAcademySystem.Server.Models;

namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
    public interface IMentorService
    {
        public void Add(MentorFormDTO mentorForm);

        public IEnumerable<MentorInformationDTO> GetAll();
    }
}
