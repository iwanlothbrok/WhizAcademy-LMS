namespace LMS_WhizAcademySystem.Core.DTOs
{
	public class PaymentFormDTO
	{
        public decimal Amount { get; set; }

        public int PayedLessons { get; set; }

        public int LessonsCompleted { get; set; }

        public DateTime? FirstLessonDate { get; set; }

        public DateTime PaymentDate { get; set; }

        public int MentorId { get; set; }
		public int StudentId { get; set; }
	}
}
