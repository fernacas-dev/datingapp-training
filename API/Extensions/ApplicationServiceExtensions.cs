using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicatonService(this IServiceCollection services, IConfiguration config)
        {
            // Keep the users connected
            services.AddSingleton<PresenceTracker>();

            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            // Services
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserActivity>();

            // Replace repositories by UnitOfWork pattern
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // Repositories
            // services.AddScoped<IUserRepository, UserRepository>();
            // services.AddScoped<IUserRepository, UserRepository>();
            // services.AddScoped<ILikesRepository, LikesRepository>();
            // services.AddScoped<IMessageRepository, MessageRepository>();

            // Configure AutoMapperService
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options => options.UseSqlServer(config.GetConnectionString("DefaultConnection")));
            return services;
        }
    }
}