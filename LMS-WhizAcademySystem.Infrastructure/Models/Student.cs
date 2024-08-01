namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = null!;

        [EmailAddress]
        public string? Email { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        public decimal PriceForHour { get; set; }

        public string? Address { get; set; }

        public int UnpaidLessons { get; set; }

        public string? Description { get; set; }

        public string? Skills { get; set; }

        public string? Homework { get; set; }

        /// <summary>
        /// Father or mother    
        /// </summary>
        public int? RelativeId { get; set; }
        public Relative? Relative { get; set; }

        public int MentorId { get; set; }
        public Mentor? Mentor { get; set; }


        public List<Lesson> Lessons = [];
        public List<Payment> Payments = [];

        /// <summary>
        /// TODO: check what type should be the excel file
        /// </summary>
        public byte[]? Roadmap { get; set; }
        public byte[]? Image { get; set; }

    }
}
