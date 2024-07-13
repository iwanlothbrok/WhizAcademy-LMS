using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace LMS_WhizAcademySystem.Infrastructure.Models
{
	public class Payment
	{
		[Key]
		public int Id { get; set; }

		[Precision(2)]
		public decimal Amount { get; set; }

		public int LessonsCount { get; set; }

		public DateTime FirstLessonDate { get; set; }
		public DateTime LastLessonDate { get; set; }

		public DateTime PaymentDate { get; set; }

		public int StudentId { get; set; }
		public Student Student { get; set; }

		public int LessonId { get; set; }
		public Lesson Lesson { get; set; }

		public int? RelativeId { get; set; }
		public Relative? Relative { get; set; }

        //public List<Lesson> PayedLessons { get; set; }
    }
}