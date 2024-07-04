using System.ComponentModel.DataAnnotations;

namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    public class Relative
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = null!;

        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string PhoneNumber { get; set; } = null!;

        public string? Address { get; set; }


        /// <summary>
        /// Relative child
        /// </summary>
        public int? StudentId { get; set; }
        public Student? Student { get; set; }
    }
}