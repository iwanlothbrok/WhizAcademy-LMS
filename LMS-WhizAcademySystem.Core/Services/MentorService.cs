namespace LMS_WhizAcademySystem.Core.Services
{
	using LMS_WhizAcademySystem.Core.Services.Interfaces;
	using LMS_WhizAcademySystem.Infrastructure.Data;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using LMS_WhizAcademySystem.Server.Models;

	public class MentorService : IMentorService
	{
		private readonly ApplicationDbContext _dbContext;

		public MentorService(ApplicationDbContext dbContext)
		{
			this._dbContext = dbContext;
		}
		public void Add(MentorFormDTO mentorForm)
		{

			if (string.IsNullOrEmpty(mentorForm.Name) || string.IsNullOrWhiteSpace(mentorForm.Name) ||
				string.IsNullOrEmpty(mentorForm.Email) || string.IsNullOrWhiteSpace(mentorForm.Email) ||
				string.IsNullOrEmpty(mentorForm.Password) || string.IsNullOrWhiteSpace(mentorForm.Password))
			{
				throw new Exception("Null value passed in form.");
			}

			Mentor mentor = new Mentor()
			{
				Name = mentorForm.Name,
				Email = mentorForm.Email,
				PasswordHash = mentorForm.Password,
				Students = new List<Student>()
			};

			_dbContext.Mentors.Add(mentor);
			_dbContext.SaveChanges();
		}

		public IEnumerable<MentorInformationDTO> GetAll()
		{
			IEnumerable<MentorInformationDTO> mentors = _dbContext.Mentors.Select(m => new MentorInformationDTO()
			{
				Name = m.Name,
				Email = m.Email,
				LessonsCount = 69,
				EarnedMoney = 123.4m,
				LastLessonDate = DateTime.Today,

				// STUDENTS WILL BE EVERYTIME EMPTY LIST
				// - GET THE STUDENTS WITH FK - MENTOR ID	 
				Students = new List<Student>() 
			});

			return mentors;
		}

	}
}
