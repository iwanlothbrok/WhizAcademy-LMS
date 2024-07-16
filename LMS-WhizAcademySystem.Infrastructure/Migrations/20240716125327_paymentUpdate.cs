using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class paymentUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LessonsCount",
                table: "Payments",
                newName: "PrePayedLessons");

            migrationBuilder.AddColumn<int>(
                name: "PayedLessons",
                table: "Payments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayedLessons",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "PrePayedLessons",
                table: "Payments",
                newName: "LessonsCount");
        }
    }
}
