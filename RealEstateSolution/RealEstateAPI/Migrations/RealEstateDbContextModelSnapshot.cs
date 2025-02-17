﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RealEstateAPI.DbContexts;

#nullable disable

namespace RealEstateAPI.Migrations
{
    [DbContext(typeof(RealEstateDbContext))]
    partial class RealEstateDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.2");

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

                    b.ToTable("Estates", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
