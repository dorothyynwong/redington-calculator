using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Services
{
    public interface IProbabilityCalculator
    {
        decimal Execute(decimal num1, decimal num2);
    }

    public class CombinedWithCalculator : IProbabilityCalculator
    {
        public decimal Execute(decimal num1, decimal num2)
        {
            return num1 * num2;
        }
    }

    public class EitherCalculator : IProbabilityCalculator
    {
        public decimal Execute(decimal num1, decimal num2)
        {
            return num1 + num2 - (num1 * num2);
        }
    }

    public class GivenCalculator : IProbabilityCalculator
    {
        public decimal Execute(decimal num1, decimal num2)
        {
            return num1 / num2;
        }
    }

}
