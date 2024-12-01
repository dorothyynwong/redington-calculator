using NLog;
using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        NLog.ILogger Logger = LogManager.GetCurrentClassLogger();
        
        public double Calculate(double num1, double num2, ProbabilityOperation operation)
        {
            if (num1 < 0 || num1 > 1 || num2 < 0 || num2 > 1)
            {
                Logger.Error("Probabilities must be between 0 and 1");
                throw new ArgumentOutOfRangeException("Probabilities must be between 0 and 1");
            }

            Logger.Info($"Calculating {operation} of {num1} and {num2}");
            
            switch (operation)
            {
                case ProbabilityOperation.CombinedWith:
                    return num1 * num2;
                case ProbabilityOperation.Either:
                    return num1 + num2 - (num1 * num2);
                default:
                    throw new ArgumentException("Invalid operation");
            }
        }
    }
}