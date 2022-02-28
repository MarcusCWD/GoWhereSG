const API_WEATHER_URL = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"

async function getWeather() {
    let response = await axios.get(
      API_WEATHER_URL
    );
    return response.data
}