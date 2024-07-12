namespace LMS_WhizAcademySystem.Core.Services
{
	using AutoMapper;
	using LMS_WhizAcademySystem.Core.DTOs;
	using LMS_WhizAcademySystem.Core.Services.Interfaces;
	using LMS_WhizAcademySystem.Infrastructure.Data;
	using LMS_WhizAcademySystem.Infrastructure.Models;
	using LMS_WhizAcademySystem.Server.Models;
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

		public void Add(MentorFormDTO mentorForm)
		{

			if (string.IsNullOrWhiteSpace(mentorForm.Name) ||
				string.IsNullOrWhiteSpace(mentorForm.Email) ||
				string.IsNullOrWhiteSpace(mentorForm.Password) ||
				mentorForm.Password.Length < 4 ||
				mentorForm.Password.Length > 14)
			{
				throw new Exception("Null value passed in form.");
			}

			//Mentor mentor = new()
			//{
			//    Name = mentorForm.Name,
			//    Email = mentorForm.Email,
			//    PasswordHash = HashPassword(mentorForm.Password),
			//    Students = new List<Student>()
			//};

			var mentor = mapper.Map<Mentor>(mentorForm);

			mentor.PasswordHash = HashPassword(mentorForm.Password);

			_dbContext.Mentors.Add(mentor);
			_dbContext.SaveChanges();
		}

		public void Edit(MentorEditDTO editForm)
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

			_dbContext.SaveChanges();
		}

		public IEnumerable<MentorInformationDTO> GetAll()
		{
			var mentors = _dbContext.Mentors.Select(m => new MentorInformationDTO()
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
			});

			return mentors;
		}

		public void Delete(int id)
		{
			var selectedMentor = GetById(id);

			if (selectedMentor == null)
			{
				throw new Exception();
			}

			_dbContext.Mentors.Remove(selectedMentor);
			_dbContext.SaveChanges();
		}

		public Mentor? GetById(int id) => _dbContext.Mentors.FirstOrDefault(m => m.Id == id);

		public MentorEditDTO? GetEditDTOById(int id) => _dbContext.Mentors
			.Where(m => m.Id == id)
			.Select(m =>
			new MentorEditDTO()
			{
				Id = m.Id,
				Name = m.Name,
				Email = m.Email,
				Password = m.PasswordHash
			}).FirstOrDefault();

		private static string HashPassword(string password)
		{
			using var sha256 = SHA256.Create();

			var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
			var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();

			return hash;
		}
	}
}
