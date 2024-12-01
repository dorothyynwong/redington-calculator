using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public class ProbabilityService : ICalculatorService<ProbabilityOperation>
    {
        public double Calculate(double num1, double num2, ProbabilityOperation operation)
        {
            if (num1 < 0 || num1 > 1 || num2 < 0 || num2 > 1)
            {
                throw new ArgumentException("Invalid probability");
            }
            
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