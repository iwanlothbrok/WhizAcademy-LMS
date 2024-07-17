namespace LMS_WhizAcademySystem.Core.DTOs
{
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using LMS_WhizAcademySystem.Server.Models;
    using System.ComponentModel.DataAnnotations;
    public class StudentFormDTO
    {
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; } = null!;

        public string Email { get; set; }

        [Phone]
        public string PhoneNumber { get; set; } = null!;

        public decimal PriceForHour { get; set; }

        public string? Address { get; set; }

        public int? RelativeId { get; set; }

        public int MentorId { get; set; }

        public int UnpaidLessons { get; set; }

        public MentorFormDTO? Mentor { get; set; }

        public Relative? Relative{ get; set; }

        /// <summary>
        /// TODO: check what type should be the excel file
        /// </summary>
        public byte[]? Roadmap { get; set; }

        //public FileContentResult FileContentResult { get; set; }
    }
}
