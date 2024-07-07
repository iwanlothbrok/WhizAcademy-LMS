namespace LMS_WhizAcademySystem.Server.Models
{
	using LMS_WhizAcademySystem.Infrastructure.Models;

	public class MentorInformationDTO
	{
		public string Name { get; set; } = null!;

		public string Email { get; set; } = null!;

		public int LessonsCount { get; set; }

		public decimal EarnedMoney { get; set; }

		public DateTime LastLessonDate { get; set; }

		public List<Student> Students = new List<Student>();
	}
}
