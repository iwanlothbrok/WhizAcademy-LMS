using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class paymentFKToRelativeWasCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RelativeId",
                table: "Payments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_RelativeId",
                table: "Payments",
                column: "RelativeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Relatives_RelativeId",
                table: "Payments",
                column: "RelativeId",
                principalTable: "Relatives",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Relatives_RelativeId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_RelativeId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "RelativeId",
                table: "Payments");
        }
    }
}
