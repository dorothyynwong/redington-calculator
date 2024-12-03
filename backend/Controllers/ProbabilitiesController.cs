using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using NLog;
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
        private static Logger _logger = LogManager.GetCurrentClassLogger();

        public ProbabilitiesController(ICalculatorService<ProbabilityOperation> calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost]
        public IActionResult Calculate([FromBody] ProbabilityRequest request)
        {
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
