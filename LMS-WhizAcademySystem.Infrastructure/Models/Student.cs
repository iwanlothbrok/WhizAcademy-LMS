namespace LMS_WhizAcademySystem.Infrastructure.Models
{
	using System.ComponentModel.DataAnnotations;
	public class Student
	{
		[Key]
		public int Id { get; set; }

		[Required, StringLength(100)]
		public string Name { get; set; } = null!;

		public string Email { get; set; } = null!;

		[Phone]
		public string PhoneNumber { get; set; } = null!;

		public decimal PriceForHour { get; set; }

		public string? Address { get; set; }

		public int UnpaidLessons { get; set; }

		/// <summary>
		/// Father or mother    
		/// </summary>
		public int? RelativeId { get; set; }
		public Relative? Relative { get; set; }

		public int MentorId { get; set; }
		public Mentor Mentor { get; set; }


		public List<Lesson> Lessons = new List<Lesson>();
		public List<Payment> Payments = new List<Payment>();
		public List<WeekProgress> Progresses = new List<WeekProgress>();
		public List<Event> Events = new List<Event>();
		/// <summary>
		/// TODO: check what type should be the excel file
		/// </summary>
		public byte[]? Roadmap { get; set; }
	}
}
