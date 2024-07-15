namespace LMS_WhizAcademySystem.Core.DTOs
{
	public class PaymentFormDTO
	{
		public decimal Amount { get; set; }
		public int LessonsCount { get; set; }
		public DateTime FirstLessonDate { get; set; }
		public DateTime LastLessonDate { get; set; }
		public DateTime PaymentDate { get; set; }
		public int MentorId { get; set; }
		public int StudentId { get; set; }
	}
}
