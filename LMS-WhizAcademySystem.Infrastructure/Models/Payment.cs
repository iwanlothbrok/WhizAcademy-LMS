namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Payment
    {
        [Key]
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public int PayedLessons { get; set; }

        public int LessonsCompleted { get; set; }

        public DateTime? FirstLessonDate { get; set; }

        public DateTime PaymentDate { get; set; }

        public int StudentId { get; set; }
        public Student Student { get; set; }

        //public int? LessonId { get; set; }
        //public Lesson? Lesson { get; set; }

        public int? MentorId { get; set; }
        public Mentor? Mentor { get; set; }

        //public List<Lesson> PayedLessons { get; set; }
    }
}