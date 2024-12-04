using System.ComponentModel.DataAnnotations;
using RedingtonCalculator.Enums;

namespace RedingtonCalculator.Models
{
    public class ProbabilityRequest
    {
        [Range(0.0, 1.0, ErrorMessage = "Num1 must be between 0 and 1.")]
        public decimal Num1 { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Num2 must be between 0 and 1.")]
        public decimal Num2 { get; set; }

        [EnumDataType(typeof(ProbabilityOperation), ErrorMessage = "Invalid operation specified.")]
        public ProbabilityOperation Operation { get; set; }
    }
}