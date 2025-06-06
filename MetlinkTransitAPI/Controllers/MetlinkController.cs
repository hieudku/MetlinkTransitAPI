using MetlinkTransitAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MetlinkTransitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetlinkController : ControllerBase
    {
        private readonly MetlinkServices _service;

        public MetlinkController(MetlinkServices service)
        {
            _service = service;
        }

        [HttpGet("stop-predictions/{stopId}")]
        public async Task<IActionResult> GetPredictions(string stopId)
        {
            var data = await _service.GetStopPredictionsAsync(stopId);
            return Content(data, "application/json");
        }
    }
}
