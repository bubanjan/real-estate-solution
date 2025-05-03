using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
            //
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

            var loggerConfig = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console();

            if (environment == "Development")
            {
                loggerConfig = loggerConfig.WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day,
                    outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level}] {Message}{NewLine}{Exception}");
            }

            Log.Logger = loggerConfig.CreateLogger();

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
                    options.AddPolicy("AllowLocalHosts", builder =>
                    {
                        builder.WithOrigins("http://localhost:5173", "https://localhost:7209", "http://localhost:8000/")
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials();
                    });
                });

                builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                if (context.Request.Cookies.ContainsKey("jwt215ho"))
                                {
                                    context.Token = context.Request.Cookies["jwt215ho"];
                                }
                                return Task.CompletedTask;
                            }
                        };

                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = builder.Configuration["Authentication:Issuer"],
                            ValidAudience = builder.Configuration["Authentication:Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(builder.Configuration["Authentication:SecretForKey"]))
                        };
                    });

                builder.Services.AddEndpointsApiExplorer();

                builder.Services.AddSwaggerGen(setupAction =>
                {
                    var xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlCommentsFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFile);

                    // NOT NEEDED NOW, HTTP ONLY COOKIES ARE USED
                    /* setupAction.AddSecurityDefinition("RealEstateApiBearerAuth", new OpenApiSecurityScheme()
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
                    }); */
                });

                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

                builder.Services.AddDbContext<RealEstateDbContext>(options =>
                    options.UseSqlite(connectionString));

                builder.Services.AddScoped<IRealEstateRepository, RealEstateRepository>();
                builder.Services.AddScoped<IUserRepository, UserRepository>();

                var app = builder.Build();

                app.UseSerilogRequestLogging();

                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseHttpsRedirection();

                app.UseCors("AllowLocalHosts");

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