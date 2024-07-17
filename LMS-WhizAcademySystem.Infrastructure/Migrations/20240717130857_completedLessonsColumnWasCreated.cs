using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class completedLessonsColumnWasCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PrePayedLessons",
                table: "Payments",
                newName: "LessonsCompleted");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LessonsCompleted",
                table: "Payments",
                newName: "PrePayedLessons");
        }
    }
}
