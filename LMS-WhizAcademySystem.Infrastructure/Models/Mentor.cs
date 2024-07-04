using System.ComponentModel.DataAnnotations;

namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    public class Mentor
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; } = null!;

        [EmailAddress]
        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;
        // Additional fields like contact info, profile picture, etc.

        public List<Student> Students = new List<Student>();
    }
}
