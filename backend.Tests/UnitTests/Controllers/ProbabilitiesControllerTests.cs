using Microsoft.AspNetCore.Mvc;
using Moq;
using RedingtonCalculator.Controllers;
using RedingtonCalculator.Enums;
using RedingtonCalculator.Models;
using RedingtonCalculator.Services;

namespace RedingtonCalculator.Tests
{
    [TestFixture]
    public class ProbabilitiesControllerTests
    {
        private Mock<ICalculatorService<ProbabilityOperation>>? _mockCalculatorService;
        private ProbabilitiesController? _controller;

        [SetUp]
        public void Setup()
        {
            _mockCalculatorService = new Mock<ICalculatorService<ProbabilityOperation>>();
            _controller = new ProbabilitiesController(_mockCalculatorService.Object);
        }

        [Test]
        public void Calculate_ValidRequest_ReturnsExpectedResponse()
        {
            var request = new ProbabilityRequest
            {
                Num1 = 0.5,
                Num2 = 0.5,
                Operation = ProbabilityOperation.CombinedWith
            };

            var expectedResult = 0.25;

            _mockCalculatorService!
                .Setup(s => s.Calculate(request.Num1, request.Num2, request.Operation))
                .Returns(expectedResult);

            var result = _controller!.Calculate(request);

            Assert.That(result, Is.InstanceOf<OkObjectResult>());

            var okResult = result as OkObjectResult;
            var probabilityResponse = okResult!.Value as ProbabilityResponse;
            Assert.That(probabilityResponse!.Result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void Calculate_InvalidOperation_ThrowsArgumentException()
        {
            var request = new ProbabilityRequest
            {
                Num1 = 0.5,
                Num2 = 0.5,
                Operation = (ProbabilityOperation)999 
            };

            var expectedMessage = "Invalid Operation";

            _mockCalculatorService!
                .Setup(s => s.Calculate(It.IsAny<double>(), It.IsAny<double>(), It.IsAny<ProbabilityOperation>()))
                .Throws(new ArgumentException("Invalid Operation"));

            var response = _controller!.Calculate(request);

            Assert.That(response, Is.InstanceOf<BadRequestObjectResult>());

            var badRequestResult = response as BadRequestObjectResult;
            Assert.That(badRequestResult!.Value, Is.EqualTo(expectedMessage));
        }

        [TestCase(1.01, 0.5, ProbabilityOperation.CombinedWith)]
        [TestCase(0.5, 1.01, ProbabilityOperation.CombinedWith)]
        [TestCase(1.01, 0.5, ProbabilityOperation.Either)]
        [TestCase(0.5, 1.01, ProbabilityOperation.Either)]
        public void Calculate_OutOfRangeProbabilities_ThrowsArgumentOutOfRangeException(double num1, double num2, ProbabilityOperation operation)
        {
            var request = new ProbabilityRequest
            {
                Num1 = num1,
                Num2 = num2,
                Operation = operation
            };

            var expectedMessage = "Probabilities must be between 0 and 1";

            _mockCalculatorService!
                .Setup(s => s.Calculate(It.IsAny<double>(), It.IsAny<double>(), It.IsAny<ProbabilityOperation>()))
                .Throws(new ArgumentOutOfRangeException("Probabilities must be between 0 and 1"));

            var response = _controller!.Calculate(request);

            Assert.That(response, Is.InstanceOf<BadRequestObjectResult>());

            var badRequestResult = response as BadRequestObjectResult;
            Assert.That(badRequestResult!.Value, Is.EqualTo(expectedMessage));
        }

        [TestCase(0, 0, ProbabilityOperation.CombinedWith, 0)]
        [TestCase(0, 0, ProbabilityOperation.Either, 0)]
        [TestCase(1, 1, ProbabilityOperation.CombinedWith, 1)]
        [TestCase(1, 1, ProbabilityOperation.Either, 1)]
        public void Calculate_ValidOperationBoundaryProbabilities_ReturnsExpectedResponse(double num1, double num2, ProbabilityOperation operation, double expected)
        {
            var request = new ProbabilityRequest
            {
                Num1 = num1,
                Num2 = num2,
                Operation = operation
            };

            _mockCalculatorService!
                .Setup(s => s.Calculate(request.Num1, request.Num2, request.Operation))
                .Returns(expected);

            var result = _controller!.Calculate(request);

            Assert.That(result, Is.InstanceOf<OkObjectResult>());

            var okResult = result as OkObjectResult;
            var probabilityResponse = okResult!.Value as ProbabilityResponse;
            Assert.That(probabilityResponse!.Result, Is.EqualTo(expected));
        }
    }
}
