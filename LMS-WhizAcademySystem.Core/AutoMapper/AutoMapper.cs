namespace LMS_WhizAcademySystem.Core.AutoMapper
{
    using global::AutoMapper;
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using LMS_WhizAcademySystem.Server.Models;

    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Student, StudentFormDTO>()
                .ForMember(dest => dest.Mentor, opt => opt.MapFrom(src => src.Mentor));
            CreateMap<StudentFormDTO, Student>();

            CreateMap<Mentor, MentorFormDTO>();
            CreateMap<MentorFormDTO, Mentor>()
            .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password));


            CreateMap<PaymentFormDTO, Payment>();
            CreateMap<Payment, PaymentFormDTO>();
            CreateMap<Payment, PaymentInformationDTO>();
            CreateMap<PaymentFormDTO, Payment>();

            CreateMap<Lesson, LessonFormDTO>();
            CreateMap<LessonFormDTO, Lesson>();

            CreateMap<Relative, RelativeFormDto>();
            CreateMap<RelativeFormDto, Relative>();
        }
    }
}
