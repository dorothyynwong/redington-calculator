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
        private readonly Dictionary<ProbabilityOperation, IProbabilityCalculator> _operations;

        public ProbabilitiesController(
            IEnumerable<IProbabilityCalculator> calculators)
        {
            _operations = new Dictionary<ProbabilityOperation, IProbabilityCalculator>();

            foreach (var calculator in calculators)
            {
                if (calculator is CombinedWithCalculator)
                    _operations[ProbabilityOperation.CombinedWith] = calculator;
                else if (calculator is EitherCalculator)
                    _operations[ProbabilityOperation.Either] = calculator;
                else if (calculator is GivenCalculator)
                    _operations[ProbabilityOperation.Given] = calculator;
            }
        }
        
        [HttpPost]
        public IActionResult Calculate([FromBody] ProbabilityRequest request)
        {
            try
            {
                var selectedOperation = _operations[request.Operation];
                var calculatedValue = selectedOperation.Execute(request.Num1, request.Num2);

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
