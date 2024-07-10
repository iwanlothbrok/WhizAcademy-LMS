﻿namespace LMS_WhizAcademySystem.Server.Extensions
{
    using LMS_WhizAcademySystem.Core.Services;
    using LMS_WhizAcademySystem.Core.Services.Interfaces;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IMentorService, MentorService>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }
    }
}
