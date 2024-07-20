namespace LMS_WhizAcademySystem.Infrastructure.Models
{
	public class Event
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public int StudentId { get; set; }
		public Student Student { get; set; }

		public int MentorId { get; set; }
		public Mentor Mentor { get; set; }

		public DateTime StartingDate { get; set; }
		public DateTime EndingDate { get; set; }

	}
}
