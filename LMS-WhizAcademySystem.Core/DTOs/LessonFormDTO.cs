namespace LMS_WhizAcademySystem.Core.DTOs
{
	public class LessonFormDTO
	{
		public string? Title { get; set; }
		public string? StudentEmail { get; set; }
		public string? MentorEmail { get; set; }
		public string? Description { get; set; }
		public DateTime StartingDate { get; set; }
		public DateTime EndingDate { get; set; }
	}
}
