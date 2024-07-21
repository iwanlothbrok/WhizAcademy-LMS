namespace LMS_WhizAcademySystem.Core.DTOs
{
	public class EventFormDTO
	{
		public string Name { get; set; }
		public string? StudentEmail { get; set; }
		public string? MentorEmail { get; set; }
		public DateTime StartingDate { get; set; }
		public DateTime EndingDate { get; set; }
	}
}
