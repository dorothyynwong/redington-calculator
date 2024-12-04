using NLog;
using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        private static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        private static decimal CombinedWith(decimal num1, decimal num2)
        {
            return num1 * num2;
        }

        private static decimal Either(decimal num1, decimal num2)
        {
            return num1 + num2 - (num1 * num2);
        }

        public decimal Calculate(decimal num1, decimal num2, ProbabilityOperation operation)
        {
            if (num1 < 0 || num1 > 1 || num2 < 0 || num2 > 1)
            {
                var ex = new ArgumentOutOfRangeException("Probabilities must be between 0 and 1");
                throw ex;
            }

            decimal calculatedValue;
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
                    throw ex;
            }

            _logger.Info($"Result for {operation} of {num1} and {num2} is {calculatedValue}");
            return calculatedValue;
        }
    }
}