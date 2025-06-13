namespace MetlinkTransitAPI.Models
{
    public class PredictionDto
    {
        public string? ExpectedDeparture { get; set; }
        public string? ScheduledDeparture { get; set; }
        public string? Line { get; set; }
    }
}
