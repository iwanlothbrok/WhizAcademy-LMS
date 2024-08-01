namespace LMS_WhizAcademySystem.Server.Models
{
    using LMS_WhizAcademySystem.Infrastructure.Models;

    public class MentorInformationDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public decimal EarnedMoney { get; set; }

        public DateTime LastLessonDate { get; set; }

        public List<Student> Students = new List<Student>();
        public List<Lesson> Lessons = new List<Lesson>();

        public int StudentsCount => Students.Count;
        public int LessonsCount => Lessons.Count;

    }
}
