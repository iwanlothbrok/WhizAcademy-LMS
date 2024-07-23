namespace LMS_WhizAcademySystem.Core.Services.Interfaces
{
	using LMS_WhizAcademySystem.Core.DTOs;

	public interface ILessonService
	{
		Task Add(LessonFormDTO model);
	}
}
