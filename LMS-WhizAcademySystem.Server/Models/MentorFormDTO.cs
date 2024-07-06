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
		public string PasswordHash { get; set; } = null!;
	}
}
