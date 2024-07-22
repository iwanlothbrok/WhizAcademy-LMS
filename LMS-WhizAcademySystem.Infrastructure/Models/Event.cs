﻿namespace LMS_WhizAcademySystem.Infrastructure.Models
{
	using System.ComponentModel.DataAnnotations;

	public class Event
	{
		public int Id { get; set; }

		[Required]
		[StringLength(50)]
		public string Name { get; set; }

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
