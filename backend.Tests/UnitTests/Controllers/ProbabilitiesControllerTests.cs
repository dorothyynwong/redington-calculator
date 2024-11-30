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

            var response = _controller!.Calculate(request);

            Assert.That(response, Is.Not.Null);
            Assert.That(response.Result, Is.EqualTo(expectedResult));
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

            _mockCalculatorService!
                .Setup(s => s.Calculate(It.IsAny<double>(), It.IsAny<double>(), It.IsAny<ProbabilityOperation>()))
                .Throws<ArgumentException>();

            Assert.Throws<ArgumentException>(() => _controller!.Calculate(request));
        }
    }
}
