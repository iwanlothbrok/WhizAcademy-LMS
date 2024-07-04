using LMS_WhizAcademySystem.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace LMS_WhizAcademySystem.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
          : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<Student>()
              .HasOne(s => s.Relative)
              .WithOne(r => r.Student)
              .HasForeignKey<Student>(s => s.RelativeId);

            builder.Entity<Relative>()
                .HasOne(r => r.Student)
                .WithOne(s => s.Relative)
                .HasForeignKey<Relative>(r => r.StudentId);

            builder.Entity<Lesson>()
               .HasOne(l => l.Student)
               .WithMany(s => s.Lessons)
               .HasForeignKey(l => l.StudentId)
               .OnDelete(DeleteBehavior.Restrict); // Avoid multiple cascade paths
        }

        public DbSet<Mentor> Mentros { get; set; }
        public DbSet<Relative> Relatives { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
