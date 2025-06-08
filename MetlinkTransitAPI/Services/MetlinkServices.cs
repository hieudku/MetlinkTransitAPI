using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MetlinkTransitAPI.Models;
using System.Text.Json;

namespace MetlinkTransitAPI.Services
{
    public class MetlinkServices
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public MetlinkServices(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;

            var baseUrl = _config["Metlink:BaseUrl"];
            Console.WriteLine("BaseUrl from config: " + baseUrl);
            Console.WriteLine("Base URL: " + _httpClient.BaseAddress);
            Console.WriteLine("API KEY PRESENT: " + !string.IsNullOrWhiteSpace(_config["Metlink:ApiKey"]));

            if (string.IsNullOrEmpty(baseUrl))
                throw new Exception("BaseUrl is missing in configuration");


            _httpClient.BaseAddress = new Uri(baseUrl);
            _httpClient.DefaultRequestHeaders.Add("x-api-key", _config["Metlink:ApiKey"]);
        }

        public async Task<string> GetStopPredictionsAsync(string stopId)
        {
            var response = await _httpClient.GetAsync($"stop-predictions?stop_id={stopId}");
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }

        /*
         * STOPS
         * Parse JSON response from the API.
         * Fields include: stop_id, stop_name, stop_lat, stop_lon.
         * 
         */
        public async Task<List<StopDto>> GetStopsAsync()
        {
            var response = await _httpClient.GetAsync("gtfs/stops");
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);

            var stops = new List<StopDto>();
            foreach (var element in doc.RootElement.EnumerateArray())
            {
                stops.Add(new StopDto
                {
                    StopId = element.GetProperty("stop_id").GetString(),
                    StopName = element.GetProperty("stop_name").GetString(),
                    Latitude = element.GetProperty("stop_lat").GetDouble(),
                    Longtitude = element.GetProperty("stop_lon").GetDouble()
                });
            }
            return stops;
        }

        /*
         * ROUTES
         * Parse JSON response from the API.
         * Fields include: route_id, route_short_name, route_long_name, route_type .
         * 
         */
        public async Task<List<RouteDto>> GetRoutesAsync()
        {
            var response = await _httpClient.GetAsync("gtfs/routes");
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);

            var routes = new List<RouteDto>();
            foreach (var route in doc.RootElement.EnumerateArray())
            {
                routes.Add(new RouteDto
                {
                    RouteId = route.GetProperty("route_id").GetString(),
                    RouteShortName = route.GetProperty("route_short_name").GetString(),
                    RouteLongName = route.GetProperty("route_long_name").GetString(),
                    RouteType = route.GetProperty("route_type").GetRawText() // parse to readable format
                });
            }

            return routes;
        }
    }
}
