using LMS_WhizAcademySystem.Infrastructure.Data;
using LMS_WhizAcademySystem.Server.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Set the environment variable for globalization
Environment.SetEnvironmentVariable("DOTNET_SYSTEM_GLOBALIZATION_INVARIANT", "false");

var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection")
	?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(connectionString));

builder.Services.AddApplicationServices();

builder.Services.AddDefaultIdentity<IdentityUser>(options =>
	options.SignIn.RequireConfirmedAccount = true)
	.AddEntityFrameworkStores<ApplicationDbContext>();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigin",
		builder =>
		{
			builder.WithOrigins("https://localhost:5173")
				   .AllowAnyHeader()
				   .AllowAnyMethod();

			builder.WithOrigins("https://localhost:5174")
			   .AllowAnyHeader()
			   .AllowAnyMethod();
		});
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();
app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.MapFallbackToFile("index.html"); // This handles the client-side routing

app.Run();
	