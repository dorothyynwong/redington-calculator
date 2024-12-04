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
                Num1 = 0.5m,
                Num2 = 0.5m,
                Operation = ProbabilityOperation.CombinedWith
            };

            var expectedResult = 0.25m;

            _mockCalculatorService!
                .Setup(s => s.Calculate(request.Num1, request.Num2, request.Operation))
                .Returns(expectedResult);

            var result = _controller!.Calculate(request);

            Assert.That(result, Is.InstanceOf<OkObjectResult>());

            var okResult = result as OkObjectResult;
            var probabilityResponse = okResult!.Value as ProbabilityResponse;
            Assert.That(probabilityResponse!.CalculatedValue, Is.EqualTo(expectedResult));
        }

        [Test]
        public void Calculate_ArgumentOutOfRangeException_ReturnsBadRequestWithMessage()
        {
            var mockServiceExceptionMessage = "Test exception";
            var request = new ProbabilityRequest
            {
                Num1 = 0.5m,
                Num2 = 0.5m,
                Operation = ProbabilityOperation.CombinedWith
            }; 

            _mockCalculatorService!.Setup(s => s.Calculate(It.IsAny<decimal>(), It.IsAny<decimal>(), It.IsAny<ProbabilityOperation>()))
                                .Throws(new ArgumentOutOfRangeException("", mockServiceExceptionMessage));

            var response = _controller!.Calculate(request);

            Assert.IsInstanceOf<BadRequestObjectResult>(response);
            Assert.That(((BadRequestObjectResult)response).Value, Is.EqualTo(mockServiceExceptionMessage));
        }

        [Test]
        public void Calculate_ArgumentException_ReturnsBadRequestWithMessage()
        {
            var mockServiceExceptionMessage = "Test exception";
            var request = new ProbabilityRequest
            {
                Num1 = 0.5m,
                Num2 = 0.5m,
                Operation = ProbabilityOperation.CombinedWith
            }; 

            _mockCalculatorService!.Setup(s => s.Calculate(It.IsAny<decimal>(), It.IsAny<decimal>(), It.IsAny<ProbabilityOperation>()))
                                .Throws(new ArgumentException(mockServiceExceptionMessage));

            var response = _controller!.Calculate(request);

            Assert.IsInstanceOf<BadRequestObjectResult>(response);
            Assert.That(((BadRequestObjectResult)response).Value, Is.EqualTo(mockServiceExceptionMessage));
        }

        [Test]
        public void Calculate_UnexpectedError_ReturnsInternalServerError()
        {
            var mockServiceExceptionMessage = "Test exception";
            var request = new ProbabilityRequest
            {
                Num1 = 0.5m,
                Num2 = 0.5m,
                Operation = ProbabilityOperation.CombinedWith
            }; 

            _mockCalculatorService!.Setup(s => s.Calculate(It.IsAny<decimal>(), It.IsAny<decimal>(), It.IsAny<ProbabilityOperation>()))
                                    .Throws(new Exception(mockServiceExceptionMessage));

            var response = _controller!.Calculate(request);

            Assert.IsInstanceOf<ObjectResult>(response);
            var statusCodeResult = response as ObjectResult;
            Assert.That(statusCodeResult!.StatusCode, Is.EqualTo(500));
        }
    }
}
