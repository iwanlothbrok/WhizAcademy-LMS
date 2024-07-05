﻿// <auto-generated />
using System;
using LMS_WhizAcademySystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LMS_WhizAcademySystem.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240705074530_databaseStructureChanges")]
    partial class databaseStructureChanges
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Lesson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MentorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Schedule")
                        .HasColumnType("datetime2");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MentorId");

                    b.HasIndex("StudentId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Mentor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Mentros");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasPrecision(2)
                        .HasColumnType("decimal(2,2)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("LessonId")
                        .HasColumnType("int");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LessonId");

                    b.HasIndex("StudentId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Relative", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StudentId")
                        .IsUnique()
                        .HasFilter("[StudentId] IS NOT NULL");

                    b.ToTable("Relatives");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MentorId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("PriceForHours")
                        .HasPrecision(2)
                        .HasColumnType("decimal(2,2)");

                    b.Property<int?>("RelativeId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Roadmap")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.HasIndex("MentorId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.WeekProgress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.ToTable("WeekProgresses");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Lesson", b =>
                {
                    b.HasOne("LMS_WhizAcademySystem.Infrastructure.Models.Mentor", "Mentor")
                        .WithMany()
                        .HasForeignKey("MentorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LMS_WhizAcademySystem.Infrastructure.Models.Student", "Student")
                        .WithMany("Lessons")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Mentor");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Payment", b =>
                {
                    b.HasOne("LMS_WhizAcademySystem.Infrastructure.Models.Lesson", "Lesson")
                        .WithMany()
                        .HasForeignKey("LessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LMS_WhizAcademySystem.Infrastructure.Models.Student", "Student")
                        .WithMany("Payments")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Lesson");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Relative", b =>
                {
                    b.HasOne("LMS_WhizAcademySystem.Infrastructure.Models.Student", "Student")
                        .WithOne("Relative")
                        .HasForeignKey("LMS_WhizAcademySystem.Infrastructure.Models.Relative", "StudentId");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Student", b =>
                {
                    b.HasOne("LMS_WhizAcademySystem.Infrastructure.Models.Mentor", "Mentor")
                        .WithMany()
                        .HasForeignKey("MentorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mentor");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.WeekProgress", b =>
                {
                    b.HasOne("LMS_WhizAcademySystem.Infrastructure.Models.Student", "Student")
                        .WithMany("Progresses")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Student");
                });

            modelBuilder.Entity("LMS_WhizAcademySystem.Infrastructure.Models.Student", b =>
                {
                    b.Navigation("Lessons");

                    b.Navigation("Payments");

                    b.Navigation("Progresses");

                    b.Navigation("Relative");
                });
#pragma warning restore 612, 618
        }
    }
}
