using NLog;
using RedingtonCalculator.Enums;
using RedingtonCalculator.Services;

var builder = WebApplication.CreateBuilder(args);
NLog.ILogger Logger = LogManager.GetCurrentClassLogger();
string currentDirectory = Directory.GetCurrentDirectory();

var config = new NLog.Config.LoggingConfiguration();

var fileTarget = new NLog.Targets.FileTarget("logfile")
{
    FileName = Path.Combine(currentDirectory, "Logs/logfile.txt"),
    Layout = "${longdate} ${level} ${message} ${exception}"
};

config.AddTarget(fileTarget);
config.AddRule(NLog.LogLevel.Info, NLog.LogLevel.Fatal, fileTarget);
LogManager.Configuration = config;

builder.Services.AddTransient<ICalculatorService<ProbabilityOperation>, ProbabilityService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(builder.Configuration["Cors:Frontend"]!).AllowAnyMethod()
                                                                    .AllowAnyHeader()
                                                                    .AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapControllers();

app.Run();