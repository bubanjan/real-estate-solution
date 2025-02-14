using Microsoft.EntityFrameworkCore;
using RealEstateAPI.DbContexts;

namespace RealEstateAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Add Connection String (Make sure you have this in appsettings.json)
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            //Register DbContext with SQLite
            builder.Services.AddDbContext<RealEstateDbContext>(options =>
                options.UseSqlite(connectionString));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}