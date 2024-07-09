namespace LMS_WhizAcademySystem.Server.Models
{
	using System.ComponentModel.DataAnnotations;

	public class MentorFormDTO
	{
		[Required, StringLength(50)]
		public string Name { get; set; } = null!;

		[EmailAddress]
		[Required]
		public string Email { get; set; } = null!;

		[Required]
		[MinLength(5), MaxLength(14)]
		public string Password { get; set; } = null!;
	}
}
