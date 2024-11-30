using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Models
{
    public class ProbabilityRequest
    {
        public double Num1 { get; set; }
        public double Num2 { get; set; }
        public ProbabilityOperation Operation { get; set; }
    }
}