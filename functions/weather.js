async function weatherFunc(weatherLayer){
    let responseWeather = await getWeather()
    for (weather of responseWeather.area_metadata){
      let weatherMarker = null;
      let weatherCoordinate = [
        weather.label_location.latitude,
        weather.label_location.longitude,
      ];
      for(weatherType of responseWeather.items[0].forecasts){
        if(weatherType.forecasts === "Cloudy" || "Partly Cloudy (Day)" || "Partly Cloudy (Night)"){
          weatherMarker = L.marker(weatherCoordinate, {icon:weatherIconCloudy});
        }
        else if(weatherType.forecasts === "Showers" || "Moderate Rain" || "Light Rain" || "Light Showers" || "Heavy Showers"){
          weatherMarker = L.marker(weatherCoordinate, {icon:weatherIconShower});
        }
        else if(weatherType.forecasts === "Fair" || "Fair (Day)" || "Fair (Night)" ||"Light & Warm"){
          weatherMarker = L.marker(weatherCoordinate, {icon:weatherIconFair});
        }
        else if(weatherType.forecasts === "Thundery Showers" || "Heavy Showers" || "Heavy Thundery Showers" || "Heavy Thundery Showers with Gusty Winds"){
          weatherMarker = L.marker(weatherCoordinate, {icon:weatherIconThunder});
        }
        else if(weatherType.forecasts === "Hazy" || "Slightly Hazy" || "Misty"){
          weatherMarker = L.marker(weatherCoordinate, {icon:weatherIconHazy});
        }
        else if(weatherType.forecasts === "Windy" ){
          weatherMarker = L.marker(weatherCoordinate, {icon:weatherIconWind});
        }
        weatherMarker.bindPopup(`<div>${weather.name}</div>`);
        weatherMarker.addTo(weatherLayer);
      }
    }
}