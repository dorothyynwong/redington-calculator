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
        public IActionResult Calculate([FromBody] ProbabilityRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Request");
            }
            
            if (!Enum.IsDefined(typeof(ProbabilityOperation), request.Operation))
            {
                return BadRequest("Invalid Operation");
            }

            if (request.Num1 < 0 || request.Num1 > 1 || request.Num2 < 0 || request.Num2 > 1)
            {
                return BadRequest("Probabilities must be between 0 and 1");
            }

            try
            {
                var result = _calculatorService.Calculate(request.Num1, request.Num2, request.Operation);
                return Ok(new ProbabilityResponse { Result = result });
            }
            catch (ArgumentOutOfRangeException e)
            {
                return BadRequest(e.Message);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
