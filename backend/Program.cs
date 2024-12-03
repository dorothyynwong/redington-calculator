using NLog;
using RedingtonCalculator.Enums;
using RedingtonCalculator.Services;

var builder = WebApplication.CreateBuilder(args);
ConfigureLogging(builder.Configuration);
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();
ConfigureMiddleware(app);
var logger = LogManager.GetCurrentClassLogger();
logger.Info("Application has started.");

app.Run();

void ConfigureLogging(IConfiguration configuration)
{
    var configFilePath = configuration["NLog:ConfigFilePath"];
    if (string.IsNullOrEmpty(configFilePath))
    {
        throw new Exception("NLog configuration file path is not specified in appsettings.json.");
    }
    LogManager.Setup().LoadConfigurationFromFile(configFilePath);
}

void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    services.AddSingleton<ICalculatorService<ProbabilityOperation>, ProbabilityService>();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins(configuration["Cors:Frontend"]!)
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
    });

    services.AddControllers().AddJsonOptions(options => { options.JsonSerializerOptions.NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString; });
}

void ConfigureMiddleware(WebApplication app)
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseCors();
    app.MapControllers();
}