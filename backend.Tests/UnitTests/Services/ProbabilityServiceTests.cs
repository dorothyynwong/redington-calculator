using NUnit.Framework;
using System;
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
        public void Calculate_ValidOperations_ReturnsExpectedResult(double num1, double num2, ProbabilityOperation operation, double expected)
        {
            var result = _probabilityService!.Calculate(num1, num2, operation);

            Assert.That(result, Is.EqualTo(expected).Within(1e-5));
        }

        [Test]
        public void Calculate_InvalidOperation_ThrowsArgumentException()
        {
            Assert.Throws<ArgumentException>(() => 
                _probabilityService!.Calculate(0.5, 0.5, (ProbabilityOperation)999));
        }
    }
}

