using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class relativeCleaned : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Relatives_Students_StudentId",
                table: "Relatives");

            migrationBuilder.DropIndex(
                name: "IX_Relatives_StudentId",
                table: "Relatives");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Relatives");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Relatives");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Relatives");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "Relatives",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Relatives_StudentId",
                table: "Relatives",
                column: "StudentId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Relatives_Students_StudentId",
                table: "Relatives",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Relatives_Students_StudentId",
                table: "Relatives");

            migrationBuilder.DropIndex(
                name: "IX_Relatives_StudentId",
                table: "Relatives");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "Relatives",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Relatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Relatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Relatives",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Relatives_StudentId",
                table: "Relatives",
                column: "StudentId",
                unique: true,
                filter: "[StudentId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Relatives_Students_StudentId",
                table: "Relatives",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");
        }
    }
}
