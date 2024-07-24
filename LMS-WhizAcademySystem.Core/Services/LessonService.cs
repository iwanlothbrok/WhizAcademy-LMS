namespace LMS_WhizAcademySystem.Core.Services
{
    using global::AutoMapper;
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    public class LessonService : ILessonService
    {
        private readonly ApplicationDbContext _data;
        private readonly IMapper _mapper;
        private readonly IStudentService _studentService;
        private readonly IMentorService _mentorService;
        public LessonService(ApplicationDbContext data, IMapper mapper, IStudentService studentService, IMentorService mentorService)
        {
            _data = data;
            _mapper = mapper;
            _studentService = studentService;
            _mentorService = mentorService;
        }

        public async Task Add(LessonFormDTO model)
        {
            var mentor = await _mentorService.GetByEmail(model.MentorEmail);
            var student = await _studentService.GetStudentByEmail(model.StudentEmail);

            if (mentor == null || student == null || string.IsNullOrWhiteSpace(model.Title))
            {
                throw new InvalidOperationException("Mentor or student not found, or title is missing.");
            }

            var lesson = _mapper.Map<Lesson>(model);
            lesson.StudentId = student.Id;
            lesson.MentorId = mentor.Id;

            await _data.Lessons.AddAsync(lesson);
            await _data.SaveChangesAsync(); // Ensure changes are saved to the database
        }

        public async Task<IEnumerable<LessonFormDTO>> GetAll()
        {
            var lessons = await this._data.Lessons.Include(m => m.Mentor).Include(s => s.Student).ToListAsync();



            var a = this._mapper.Map<List<LessonFormDTO>>(lessons);
            return a;

        }
    }
}

