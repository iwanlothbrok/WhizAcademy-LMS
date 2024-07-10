namespace LMS_WhizAcademySystem.Core.DTOs
{
    using Microsoft.EntityFrameworkCore;
    using System.ComponentModel.DataAnnotations;
    public class StudentFormDTO
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = null!;

        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Phone]
        public string PhoneNumber { get; set; } = null!;

        public decimal PriceForHour { get; set; }

        public string? Address { get; set; }

        public int? RelativeId { get; set; }

        public int MentorId { get; set; }

        /// <summary>
        /// TODO: check what type should be the excel file
        /// </summary>
        public byte[]? Roadmap { get; set; }

        //public FileContentResult FileContentResult { get; set; }
    }
}
