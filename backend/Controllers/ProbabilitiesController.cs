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

        public ProbabilitiesController(ICalculatorService<ProbabilityOperation> calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost]
        public IActionResult Calculate([FromBody] ProbabilityRequest request)
        {
            try
            {
                var calculatedValue = _calculatorService.Calculate(request.Num1, request.Num2, request.Operation);
                return Ok(new ProbabilityResponse { CalculatedValue = calculatedValue });
            }
            catch (ArgumentOutOfRangeException e)
            {
                return BadRequest(e.Message);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e) 
            {
                return StatusCode(500, $"An unexpected error occurred: {e.Message}");
            }
        }
    }
}
