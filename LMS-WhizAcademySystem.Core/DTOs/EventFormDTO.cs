namespace LMS_WhizAcademySystem.Core.DTOs
{
	public class EventFormDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int StudentId { get; set; }
		public int MentorId { get; set; }
		public DateTime StartingDate { get; set; }
		public DateTime EndingDate { get; set; }
	}
}
