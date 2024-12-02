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
        public void Calculate_ValidRequest_ReturnsOkExpectedResult()
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
            var expectedMessage = "Invalid Operation";
            var request = new ProbabilityRequest
            {
                Num1 = 0.5,
                Num2 = 0.5,
                Operation = (ProbabilityOperation)999 
            };

            var response = _controller!.Calculate(request);

            Assert.IsInstanceOf<BadRequestObjectResult>(response);
            Assert.That(((BadRequestObjectResult)response).Value, Is.EqualTo(expectedMessage));
        }

        [TestCase(1.01, 0.5)]
        [TestCase(0.5, 1.01)]
        [TestCase(1.01, 0.5)]
        [TestCase(0.5, 1.01)]
        public void Calculate_OutOfRangeProbabilities_ThrowsArgumentOutOfRangeException(double num1, double num2)
        {
            var expectedMessage = "Probabilities must be between 0 and 1";
            var request = new ProbabilityRequest
            {
                Num1 = num1,
                Num2 = num2,
                Operation = ProbabilityOperation.CombinedWith
            }; 

            var response = _controller!.Calculate(request);

            Assert.IsInstanceOf<BadRequestObjectResult>(response);
            Assert.That(((BadRequestObjectResult)response).Value, Is.EqualTo(expectedMessage));
        }

        
        [Test]
        public void Calculate_ArgumentOutOfRangeException_ReturnsBadRequest()
        {
            var mockServiceExceptionMessage = "Test exception";
            var request = new ProbabilityRequest
            {
                Num1 = 0.5,
                Num2 = 0.5,
                Operation = ProbabilityOperation.CombinedWith
            }; 

            _mockCalculatorService!.Setup(s => s.Calculate(It.IsAny<double>(), It.IsAny<double>(), It.IsAny<ProbabilityOperation>()))
                                .Throws(new ArgumentOutOfRangeException("", mockServiceExceptionMessage));

            var response = _controller!.Calculate(request);

            Assert.IsInstanceOf<BadRequestObjectResult>(response);
            Assert.That(((BadRequestObjectResult)response).Value, Is.EqualTo(mockServiceExceptionMessage));
        }

        [Test]
        public void Calculate_ArgumentException_ReturnsBadRequest()
        {
            var mockServiceExceptionMessage = "Test exception";
            var request = new ProbabilityRequest
            {
                Num1 = 0.5,
                Num2 = 0.5,
                Operation = ProbabilityOperation.CombinedWith
            }; 

            _mockCalculatorService!.Setup(s => s.Calculate(It.IsAny<double>(), It.IsAny<double>(), It.IsAny<ProbabilityOperation>()))
                                .Throws(new ArgumentException(mockServiceExceptionMessage));

            var response = _controller!.Calculate(request);

            Assert.IsInstanceOf<BadRequestObjectResult>(response);
            Assert.That(((BadRequestObjectResult)response).Value, Is.EqualTo(mockServiceExceptionMessage));
        }

        [TestCase(0, 0, ProbabilityOperation.CombinedWith, 0)]
        [TestCase(0, 0, ProbabilityOperation.Either, 0)]
        [TestCase(1, 1, ProbabilityOperation.CombinedWith, 1)]
        [TestCase(1, 1, ProbabilityOperation.Either, 1)]
        public void Calculate_ValidOperationBoundaryProbabilities_ReturnsOkExpectedResult(double num1, double num2, ProbabilityOperation operation, double expected)
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
