using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        public double Calculate(double num1, double num2, ProbabilityOperation operation)
        {
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