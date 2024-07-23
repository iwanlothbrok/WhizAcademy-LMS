using System.ComponentModel.DataAnnotations;

namespace LMS_WhizAcademySystem.Infrastructure.Models
{
    public class Lesson
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;

		[StringLength(100)]
		public string Description { get; set; }

		public int StudentId { get; set; }
		public Student Student { get; set; }

		public int MentorId { get; set; }
		public Mentor Mentor { get; set; }

		public DateTime StartingDate { get; set; }
		public DateTime EndingDate { get; set; }

	}
}
