namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;
    public class Mentor
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(80)]
        public string Name { get; set; } = null!;

        [EmailAddress]
        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;
        // Additional fields like contact info, profile picture, etc.

        public List<Student> Students = new List<Student>();
        public List<Lesson> Lessons = new List<Lesson>();

    }
}
