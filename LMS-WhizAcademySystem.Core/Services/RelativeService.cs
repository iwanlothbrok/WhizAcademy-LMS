namespace LMS_WhizAcademySystem.Core.Services
{
    using global::AutoMapper;
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;

    public class RelativeService(ApplicationDbContext data, IMapper mapper, IStudentService studentService) : IRelativeService
    {
        private readonly ApplicationDbContext data = data;
        private readonly IMapper mapper = mapper;
        private readonly IStudentService _studentService = studentService;

        public async Task Add(RelativeFormDto model)
        {
            if (string.IsNullOrWhiteSpace(model.Name)) { throw new Exception("Relative cannot be empty"); }

            var relative = mapper.Map<Relative>(model);

            await this.data.AddAsync(relative);
            int relativeId = await this.data.SaveChangesAsync();

            if (relativeId > 0)
            {
                await this._studentService.AddRelative(relative.StudentId, relativeId);
            }
        }
    }
}
