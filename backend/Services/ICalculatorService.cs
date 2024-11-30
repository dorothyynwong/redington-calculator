namespace RedingtonCalculator.Services
{
    public interface ICalculatorService<T>
    {
        double Calculate(double num1, double num2, T operation);
    }
}