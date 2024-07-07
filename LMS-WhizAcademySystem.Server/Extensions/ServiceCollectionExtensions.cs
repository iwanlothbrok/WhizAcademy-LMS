using LMS_WhizAcademySystem.Core.Services;
using LMS_WhizAcademySystem.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace LMS_WhizAcademySystem.Server.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IMentorService, MentorService>();

            return services;
        }
    }
}
