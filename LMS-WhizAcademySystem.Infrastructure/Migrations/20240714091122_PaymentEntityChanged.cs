using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PaymentEntityChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Lessons_LessonId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Relatives_RelativeId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_LessonId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "RelativeId",
                table: "Payments",
                newName: "MentorId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_RelativeId",
                table: "Payments",
                newName: "IX_Payments_MentorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Mentors_MentorId",
                table: "Payments",
                column: "MentorId",
                principalTable: "Mentors",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Mentors_MentorId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "MentorId",
                table: "Payments",
                newName: "RelativeId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_MentorId",
                table: "Payments",
                newName: "IX_Payments_RelativeId");

            migrationBuilder.AddColumn<int>(
                name: "LessonId",
                table: "Payments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_LessonId",
                table: "Payments",
                column: "LessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Lessons_LessonId",
                table: "Payments",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Relatives_RelativeId",
                table: "Payments",
                column: "RelativeId",
                principalTable: "Relatives",
                principalColumn: "Id");
        }
    }
}
