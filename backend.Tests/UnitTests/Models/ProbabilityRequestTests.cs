using RedingtonCalculator.Models;
using RedingtonCalculator.Enums;
using System.ComponentModel.DataAnnotations;

namespace RedingtonCalculator.Tests
{
    [TestFixture]
    public class ProbabilityRequestTests
    {
        [TestCase(0.5, 0.5, ProbabilityOperation.CombinedWith, true)]
        [TestCase(-0.01, 0.5, ProbabilityOperation.CombinedWith, false)]
        [TestCase(0.5, 1.01, ProbabilityOperation.CombinedWith, false)]
        [TestCase(0, 0, ProbabilityOperation.Either, true)]
        [TestCase(1, 1, ProbabilityOperation.Either, true)]
        [TestCase(0.5, 0.5, (ProbabilityOperation)999, false)]
        public void ProbabilityRequest_ValidationTests(decimal num1, decimal num2, ProbabilityOperation operation, bool isValid)
        {
            var request = new ProbabilityRequest
            {
                Num1 = num1,
                Num2 = num2,
                Operation = operation
            };

            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(request, null, null);
            bool actualIsValid = Validator.TryValidateObject(request, validationContext, validationResults, true);

            Assert.That(actualIsValid, Is.EqualTo(isValid));
        }
    }
}