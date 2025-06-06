using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

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
    }
}
