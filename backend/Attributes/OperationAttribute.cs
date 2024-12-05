namespace RedingtonCalculator.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class OperationAttribute<T> : Attribute
    {
        public T Operation { get; }

        public OperationAttribute(T operation)
        {
            Operation = operation;
        }
    }
}
