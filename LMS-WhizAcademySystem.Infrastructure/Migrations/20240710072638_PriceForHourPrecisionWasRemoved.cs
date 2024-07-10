using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PriceForHourPrecisionWasRemoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceForHours",
                table: "Students");

            migrationBuilder.AddColumn<decimal>(
                name: "PriceForHour",
                table: "Students",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceForHour",
                table: "Students");

            migrationBuilder.AddColumn<decimal>(
                name: "PriceForHours",
                table: "Students",
                type: "decimal(2,2)",
                precision: 2,
                nullable: false,
                defaultValue: 0m);
        }
    }
}
