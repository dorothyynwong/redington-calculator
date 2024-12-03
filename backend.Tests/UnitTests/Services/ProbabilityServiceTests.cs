using RedingtonCalculator.Enums;
using RedingtonCalculator.Services;

namespace RedingtonCalculator.Tests
{
    [TestFixture]
    public class ProbabilityServiceTests
    {
        private ProbabilityService? _probabilityService;

        [SetUp]
        public void Setup()
        {
            _probabilityService = new ProbabilityService();
        }

        [TestCase(0.5, 0.5, ProbabilityOperation.CombinedWith, 0.25)]
        [TestCase(0.5, 0.5, ProbabilityOperation.Either, 0.75)]
        public void Calculate_ValidOperations_ReturnsExpectedResult(decimal num1, decimal num2, ProbabilityOperation operation, decimal expected)
        {
            var result = _probabilityService!.Calculate(num1, num2, operation);

            Assert.That(result, Is.EqualTo(expected));
        }

        [TestCase(0, 0, ProbabilityOperation.CombinedWith, 0)]
        [TestCase(0, 0, ProbabilityOperation.Either, 0)]
        [TestCase(1, 1, ProbabilityOperation.CombinedWith, 1)]
        [TestCase(1, 1, ProbabilityOperation.Either, 1)]
        public void Calculate_BoundaryInputsValidOperations_ReturnsExpectedResult(decimal num1, decimal num2, ProbabilityOperation operation, decimal expected)
        {
            var result = _probabilityService!.Calculate(num1, num2, operation);

            Assert.That(result, Is.EqualTo(expected));
        }

        [TestCase(1.01, 0.5, ProbabilityOperation.CombinedWith)]
        [TestCase(0.5, 1.01, ProbabilityOperation.CombinedWith)]
        [TestCase(1.01, 0.5, ProbabilityOperation.Either)]
        [TestCase(0.5, 1.01, ProbabilityOperation.Either)]
        [TestCase(0.5, -0.01, ProbabilityOperation.CombinedWith)]
        [TestCase(-0.01, 0.5, ProbabilityOperation.CombinedWith)]
        public void Calculate_InvalidProbabilitiesValidOperations_ThrowsArgumentOutOfRangeException(decimal num1, decimal num2, ProbabilityOperation operation)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => 
                _probabilityService!.Calculate(num1, num2, operation));
        }

        [Test]
        public void Calculate_InvalidOperation_ThrowsArgumentException()
        {
            Assert.Throws<ArgumentException>(() => 
                _probabilityService!.Calculate(0.5m, 0.5m, (ProbabilityOperation)999));
        }
    }
}

