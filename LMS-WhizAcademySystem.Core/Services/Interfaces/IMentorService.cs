namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using LMS_WhizAcademySystem.Server.Models;

	public interface IMentorService
	{
		Task Add(MentorFormDTO mentorForm);

		Task Edit(MentorEditDTO editForm);

		Task Delete(int id);

		Mentor? GetById(int id);
		Task<Mentor?> GetByEmail(string email);

		Task<IEnumerable<MentorInformationDTO>> GetAll();
	}
}
