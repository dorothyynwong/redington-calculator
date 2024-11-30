using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        public double Calculate(double num1, double num2, ProbabilityOperation operation)
        {
            return operation switch
            {
                ProbabilityOperation.CombinedWith => num1 * num2,
                ProbabilityOperation.Either => num1 + num2 - (num1 * num2),
                _ => throw new System.ArgumentException("Invalid operation"),
            };
        }
    }
}