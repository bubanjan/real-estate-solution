using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageLinks_Estates_RealEstateId",
                table: "ImageLinks");

            migrationBuilder.RenameColumn(
                name: "RealEstateId",
                table: "ImageLinks",
                newName: "EstateId");

            migrationBuilder.RenameIndex(
                name: "IX_ImageLinks_RealEstateId",
                table: "ImageLinks",
                newName: "IX_ImageLinks_EstateId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLinks_Estates_EstateId",
                table: "ImageLinks",
                column: "EstateId",
                principalTable: "Estates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageLinks_Estates_EstateId",
                table: "ImageLinks");

            migrationBuilder.RenameColumn(
                name: "EstateId",
                table: "ImageLinks",
                newName: "RealEstateId");

            migrationBuilder.RenameIndex(
                name: "IX_ImageLinks_EstateId",
                table: "ImageLinks",
                newName: "IX_ImageLinks_RealEstateId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLinks_Estates_RealEstateId",
                table: "ImageLinks",
                column: "RealEstateId",
                principalTable: "Estates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
