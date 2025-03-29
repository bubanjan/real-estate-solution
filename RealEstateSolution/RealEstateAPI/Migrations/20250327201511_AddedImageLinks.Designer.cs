﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RealEstateAPI.DbContexts;

#nullable disable

namespace RealEstateAPI.Migrations
{
    [DbContext(typeof(RealEstateDbContext))]
    [Migration("20250327201511_AddedImageLinks")]
    partial class AddedImageLinks
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.2");

            modelBuilder.Entity("EstateTag", b =>
                {
                    b.Property<int>("EstatesId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TagsId")
                        .HasColumnType("INTEGER");

                    b.HasKey("EstatesId", "TagsId");

                    b.HasIndex("TagsId");

                    b.ToTable("EstateTags", (string)null);
                });

            modelBuilder.Entity("RealEstateAPI.Entities.Estate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("City")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("EstateCategory")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Price")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SellerContact")
                        .HasColumnType("TEXT");

                    b.Property<int>("Size")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Estates");
                });

            modelBuilder.Entity("RealEstateAPI.Entities.ImageLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("RealEstateId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RealEstateId");

                    b.ToTable("ImageLinks");
                });

            modelBuilder.Entity("RealEstateAPI.Entities.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Tags");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "SeaView"
                        },
                        new
                        {
                            Id = 2,
                            Name = "NewBuild"
                        },
                        new
                        {
                            Id = 3,
                            Name = "HasParking"
                        });
                });

            modelBuilder.Entity("RealEstateAPI.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EstateTag", b =>
                {
                    b.HasOne("RealEstateAPI.Entities.Estate", null)
                        .WithMany()
                        .HasForeignKey("EstatesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RealEstateAPI.Entities.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RealEstateAPI.Entities.ImageLink", b =>
                {
                    b.HasOne("RealEstateAPI.Entities.Estate", "Estate")
                        .WithMany("ImageLinks")
                        .HasForeignKey("RealEstateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Estate");
                });

            modelBuilder.Entity("RealEstateAPI.Entities.Estate", b =>
                {
                    b.Navigation("ImageLinks");
                });
#pragma warning restore 612, 618
        }
    }
}
