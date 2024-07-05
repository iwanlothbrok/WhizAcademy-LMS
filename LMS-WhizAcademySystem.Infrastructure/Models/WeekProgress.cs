using System.ComponentModel.DataAnnotations;

namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    public class WeekProgress
    {
        [Key]
        public int Id { get; set; }

        public string? Description { get; set; }

        public DateTime Date { get; set; }

        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}