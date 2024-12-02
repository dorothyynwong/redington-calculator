using NLog;
using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        NLog.ILogger Logger = LogManager.GetCurrentClassLogger();

        private double CombinedWith(double num1, double num2)
        {
            return num1 * num2;
        }

        private double Either(double num1, double num2)
        {
            return num1 + num2 - (num1 * num2);
        }
        
        public double Calculate(double num1, double num2, ProbabilityOperation operation)
        {
            if (num1 < 0 || num1 > 1 || num2 < 0 || num2 > 1)
            {
                Logger.Error($"Probabilities must be between 0 and 1. ${num1} and ${num2} are provided instead.");
                throw new ArgumentOutOfRangeException("Probabilities must be between 0 and 1");
            }

            double result;
            switch (operation)
            {
                case ProbabilityOperation.CombinedWith:
                    result = CombinedWith(num1, num2);
                    break;
                case ProbabilityOperation.Either:
                    result = Either(num1, num2);
                    break;
                default:
                    Logger.Error($"Invalid operation. {operation} is given.");
                    throw new ArgumentException("Invalid operation");
            }
            
            Logger.Info($"Result of {operation} of {num1} and {num2} is {result}");
            return result;
        }
    }
}