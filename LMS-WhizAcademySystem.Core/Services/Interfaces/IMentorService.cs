using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Infrastructure.Models;
using LMS_WhizAcademySystem.Server.Models;

namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
    public interface IMentorService
    {
        public void Add(MentorFormDTO mentorForm);

        public void Update(MentorEditDTO editForm);

        public void Delete(int id);

        public Mentor? GetById(int id);
        public MentorEditDTO? GetEditDTOById(int id);

        public IEnumerable<MentorInformationDTO> GetAll();
    }
}
