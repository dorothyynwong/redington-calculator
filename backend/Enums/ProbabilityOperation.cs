using System.Text.Json.Serialization;

namespace RedingtonCalculator.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProbabilityOperation
    {
        CombinedWith,
        Either,
        Given
    }
}