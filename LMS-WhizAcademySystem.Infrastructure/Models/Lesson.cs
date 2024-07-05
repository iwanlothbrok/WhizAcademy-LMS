using System.ComponentModel.DataAnnotations;

namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    public class Lesson
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;
        public DateTime Schedule { get; set; }

        [Required]
        public string Language { get; set; } = null!;

        public int MentorId { get; set; }
        public Mentor Mentor { get; set; }

        public int StudentId { get; set; }
        public Student Student { get; set; }

    }
}
