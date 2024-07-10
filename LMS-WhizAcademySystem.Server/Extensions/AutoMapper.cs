using AutoMapper;
using LMS_WhizAcademySystem.Core.DTOs;
using LMS_WhizAcademySystem.Infrastructure.Models;

namespace LMS_WhizAcademySystem.Server.Extensions
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Student, StudentFormDTO>();
            CreateMap<StudentFormDTO, Student>();
        }
    }
}
