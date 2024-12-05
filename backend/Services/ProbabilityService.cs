using NLog;
using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        private static readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly Dictionary<ProbabilityOperation, IProbabilityCalculator> _operations;

        public ProbabilityService(
            IProbabilityCalculator combinedWithOperation,
            IProbabilityCalculator eitherOperation,
            IProbabilityCalculator givenOperation)
        {
            _operations = new Dictionary<ProbabilityOperation, IProbabilityCalculator>
            {
                { ProbabilityOperation.CombinedWith, combinedWithOperation },
                { ProbabilityOperation.Either, eitherOperation },
                { ProbabilityOperation.Given, givenOperation }
            };
        }

        public decimal Calculate(decimal num1, decimal num2, ProbabilityOperation operation)
        {
            if (num1 < 0 || num1 > 1 || num2 < 0 || num2 > 1)
            {
                var ex = new ArgumentOutOfRangeException("Probabilities must be between 0 and 1");
                throw ex;
            }

            if (_operations.ContainsKey(operation))
            {
                var selectedOperation = _operations[operation];
                decimal calculatedValue = selectedOperation.Execute(num1, num2);

                _logger.Info($"Result for {operation} of {num1} and {num2} is {calculatedValue}");
                return calculatedValue;
            }
            else
            {
                var ex = new ArgumentException("Invalid operation");
                throw ex;
            }
        }
    }
}