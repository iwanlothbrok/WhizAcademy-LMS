using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MentorTableNameFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Mentros_MentorId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Mentros_MentorId",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mentros",
                table: "Mentros");

            migrationBuilder.RenameTable(
                name: "Mentros",
                newName: "Mentors");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mentors",
                table: "Mentors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Mentors_MentorId",
                table: "Lessons",
                column: "MentorId",
                principalTable: "Mentors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Mentors_MentorId",
                table: "Students",
                column: "MentorId",
                principalTable: "Mentors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Mentors_MentorId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Mentors_MentorId",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mentors",
                table: "Mentors");

            migrationBuilder.RenameTable(
                name: "Mentors",
                newName: "Mentros");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mentros",
                table: "Mentros",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Mentros_MentorId",
                table: "Lessons",
                column: "MentorId",
                principalTable: "Mentros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Mentros_MentorId",
                table: "Students",
                column: "MentorId",
                principalTable: "Mentros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
