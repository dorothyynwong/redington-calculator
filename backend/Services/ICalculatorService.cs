namespace RedingtonCalculator.Services
{
    public interface ICalculatorService<T>
    {
        decimal Calculate(decimal num1, decimal num2, T operation);
    }
}