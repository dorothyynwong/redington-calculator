using NLog;
using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        private static Logger _logger = LogManager.GetCurrentClassLogger();

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
                var ex = new ArgumentOutOfRangeException("Probabilities must be between 0 and 1");
                _logger.Error(ex, $"Invalid probabilities provided: {num1} and {num2}");
                throw ex;
            }

            double calculatedValue;
            switch (operation)
            {
                case ProbabilityOperation.CombinedWith:
                    calculatedValue = CombinedWith(num1, num2);
                    break;
                case ProbabilityOperation.Either:
                    calculatedValue = Either(num1, num2);
                    break;
                default:
                    var ex = new ArgumentException("Invalid operation");
                    _logger.Error(ex, $"Invalid operation provided: {operation}");
                    throw ex;

            }

            _logger.Info($"Result of {operation} of {num1} and {num2} is {calculatedValue}");
            return calculatedValue;
        }
    }
}