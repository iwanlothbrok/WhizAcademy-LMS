namespace LMS_WhizAcademySystem.Core.Services
{
    using global::AutoMapper;
    using LMS_WhizAcademySystem.Core.DTOs;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using LMS_WhizAcademySystem.Server.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Security.Cryptography;
    using System.Text;

    public class MentorService : IMentorService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper mapper;

        public MentorService(ApplicationDbContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task Add(MentorFormDTO mentorForm)
        {
            if (string.IsNullOrWhiteSpace(mentorForm.Name) ||
                string.IsNullOrWhiteSpace(mentorForm.Email) ||
                string.IsNullOrWhiteSpace(mentorForm.Password) ||
                mentorForm.Password.Length < 4 ||
                mentorForm.Password.Length > 14)
            {
                throw new Exception("Null value passed in form.");
            }

            var mentor = mapper.Map<Mentor>(mentorForm);

            mentor.PasswordHash = HashPassword(mentorForm.Password);

            await _dbContext.Mentors.AddAsync(mentor);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Edit(MentorEditDTO editForm)
        {
            Mentor? mentor = GetById(editForm.Id);

            if (mentor == null)
            {
                throw new Exception("Mentor is null, invalid id.");
            }

            if (string.IsNullOrWhiteSpace(editForm.Name) ||
           string.IsNullOrWhiteSpace(editForm.Email) ||
           string.IsNullOrWhiteSpace(editForm.Password) ||
           editForm.Password.Length < 4 ||
           editForm.Password.Length > 14)
            {
                throw new Exception("Null value passed in form.");
            }

            mentor.Name = editForm.Name;
            mentor.Email = editForm.Email;
            mentor.PasswordHash = HashPassword(editForm.Password);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<MentorInformationDTO>> GetAll()
        {
            var mentors = await _dbContext.Mentors.Select(m => new MentorInformationDTO()
            {
                Id = m.Id,
                Name = m.Name,
                Email = m.Email,
                LessonsCount = 69,
                EarnedMoney = 123.4m,
                LastLessonDate = DateTime.Today,

                // STUDENTS WILL BE EVERYTIME EMPTY LIST
                // - GET THE STUDENTS WITH FK - MENTOR ID	 
                Students = new List<Student>()
            }).ToListAsync();

            return mentors;
        }

        public async Task Delete(int id)
        {
            var selectedMentor = GetById(id);

            if (selectedMentor == null)
            {
                throw new Exception();
            }

            _dbContext.Mentors.Remove(selectedMentor);
            await _dbContext.SaveChangesAsync();
        }

        public Mentor? GetById(int id) => _dbContext.Mentors.FirstOrDefault(m => m.Id == id);

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();

            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();

            return hash;
        }
    }
}
