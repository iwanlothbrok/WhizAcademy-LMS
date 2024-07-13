using AutoMapper;
using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Infrastructure.Models;
using LMS_WhizAcademySystem.Server.Models;

namespace LMS_WhizAcademySystem.Core.AutoMapper
{
	public class AutoMapper : Profile
	{
		public AutoMapper()
		{
			CreateMap<Student, StudentFormDTO>();
			CreateMap<StudentFormDTO, Student>();

			CreateMap<Mentor, MentorFormDTO>();
			CreateMap<MentorFormDTO, Mentor>()
			.ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password));

		}
	}
}
