namespace LMS_WhizAcademySystem.Core.Services
{
    using LMS_WhizAcademySystem.Core.Services.Interfaces;
    using LMS_WhizAcademySystem.Infrastructure.Data;
    using LMS_WhizAcademySystem.Infrastructure.Models;
    using LMS_WhizAcademySystem.Server.Models;
    using System.Security.Cryptography;
    using System.Text;

    public class MentorService : IMentorService
    {
        private readonly ApplicationDbContext _dbContext;

        public MentorService(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public void Add(MentorFormDTO mentorForm)
        {

            if (string.IsNullOrWhiteSpace(mentorForm.Name) ||
                string.IsNullOrWhiteSpace(mentorForm.Email) ||
                string.IsNullOrWhiteSpace(mentorForm.Password))
            {
                throw new Exception("Null value passed in form.");
            }

            Mentor mentor = new()
            {
                Name = mentorForm.Name,
                Email = mentorForm.Email,
                PasswordHash = HashPassword(mentorForm.Password),
                Students = []
            };

            _dbContext.Mentors.Add(mentor);
            _dbContext.SaveChanges();
        }

        public IEnumerable<MentorInformationDTO> GetAll()
        {
            IEnumerable<MentorInformationDTO> mentors = _dbContext.Mentors.Select(m => new MentorInformationDTO()
            {
                Name = m.Name,
                Email = m.Email,
                LessonsCount = 69,
                EarnedMoney = 123.4m,
                LastLessonDate = DateTime.Today,

                // STUDENTS WILL BE EVERYTIME EMPTY LIST
                // - GET THE STUDENTS WITH FK - MENTOR ID	 
                Students = { }
            });

            return mentors;
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();

            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();

            return hash;
        }
    }
}
