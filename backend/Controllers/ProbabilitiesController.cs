using Microsoft.AspNetCore.Mvc;
using RedingtonCalculator.Attributes;
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
            _operations = calculators.ToDictionary(
                GetOperationFromCalculator,
                calculator => calculator);
        }

        private ProbabilityOperation GetOperationFromCalculator(IProbabilityCalculator calculator)
        {
            var attribute = calculator.GetType()
                .GetCustomAttributes(typeof(OperationAttribute<>), false)
                .Cast<OperationAttribute<ProbabilityOperation>>()
                .FirstOrDefault();

            if (attribute != null)
            {
                return attribute.Operation;
            }

            throw new InvalidOperationException("Operation not specified.");
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
