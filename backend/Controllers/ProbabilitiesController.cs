using Microsoft.AspNetCore.Mvc;
using RedingtonCalculator.Enums;
using RedingtonCalculator.Models;
using RedingtonCalculator.Services;

namespace RedingtonCalculator.Controllers
{
    [ApiController]
    [Route("/probabilities")]
    public class ProbabilitiesController : ControllerBase
    {
        private readonly ICalculatorService<ProbabilityOperation> _calculatorService;

        public ProbabilitiesController(ICalculatorService<ProbabilityOperation> calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost]
        public ProbabilityResponse Calculate([FromBody] ProbabilityRequest request)
        {
            var result = _calculatorService.Calculate(request.Num1, request.Num2, request.Operation);

            return new ProbabilityResponse { Result = result };
        }
    }
}
