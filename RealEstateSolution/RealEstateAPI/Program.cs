using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RealEstateAPI.DbContexts;
using RealEstateAPI.Repositories;
using Serilog;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

namespace RealEstateAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day,
                               outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level}] {Message}{NewLine}{Exception}")
                .CreateLogger();

            try
            {
                var builder = WebApplication.CreateBuilder(args);

                builder.Host.UseSerilog();

                builder.Services.AddControllers()
                    .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    });

                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("AllowLocalhost3000", builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                               .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                               .WithHeaders("Content-Type", "Authorization")
                               .AllowCredentials();
                    });
                });

                builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = builder.Configuration["Authentication:Issuer"],
                            ValidAudience = builder.Configuration["Authentication:Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(
                                Encoding.ASCII.GetBytes(builder.Configuration["Authentication:SecretForKey"]))
                        };
                    });

                builder.Services.AddEndpointsApiExplorer();

                builder.Services.AddSwaggerGen(setupAction =>
                {
                    var xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlCommentsFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFile);

                    setupAction.AddSecurityDefinition("RealEstateApiBearerAuth", new OpenApiSecurityScheme()
                    {
                        Type = SecuritySchemeType.Http,
                        Scheme = "Bearer",
                        Description = "Input a valid token to access this API"
                    });

                    setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "RealEstateApiBearerAuth"
                                }
                            },
                            new List<string>()
                        }
                    });
                });

                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

                builder.Services.AddDbContext<RealEstateDbContext>(options =>
                    options.UseSqlite(connectionString));

                builder.Services.AddScoped<IRealEstateRepository, RealEstateRepository>();
                builder.Services.AddScoped<IUserRepository, UserRepository>(); // Added user repository for authentication

                var app = builder.Build();

                app.UseSerilogRequestLogging();

                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseHttpsRedirection();

                app.UseCors("AllowLocalhost3000");

                app.UseAuthentication();
                app.UseAuthorization();

                app.MapControllers();

                app.Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Application startup failed!");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}