using NLog;
using NLog.Config;
using NLog.Targets;
using RedingtonCalculator.Enums;
using RedingtonCalculator.Services;

var builder = WebApplication.CreateBuilder(args);
ConfigureLogging();
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();
ConfigureMiddleware(app);
var logger = LogManager.GetCurrentClassLogger();
logger.Info("Application has started.");

app.Run();

void ConfigureLogging()
{
    string currentDirectory = Directory.GetCurrentDirectory();
    var config = new LoggingConfiguration();

    var fileTarget = new FileTarget("logfile")
    {
        FileName = Path.Combine(currentDirectory, "Logs/logfile.txt"),
        Layout = "${longdate} ${level} - ${logger}: ${message} ${exception}"
    };

    config.AddTarget(fileTarget);
    config.AddRule(NLog.LogLevel.Info, NLog.LogLevel.Fatal, fileTarget);
    LogManager.Configuration = config;
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

    services.AddControllers();
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