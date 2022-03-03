async function weatherFunc(weatherLayer){
    let responseWeather = await getWeather()
    let weatherCoordinate = [];

    let weatherMarker = null;
    for (weather of responseWeather.area_metadata){ // iterates 47 times based on location
      weatherCoordinate.push([weather.label_location.latitude, weather.label_location.longitude])

    }

    for(weatherType of responseWeather.items[0].forecasts){
      if(weatherType.forecast == "Cloudy" || weatherType.forecast =="Partly Cloudy (Day)" || weatherType.forecast == "Partly Cloudy (Night)"){
        weatherMarker = L.marker(weatherCoordinate[responseWeather.items[0].forecasts.indexOf(weatherType)], {icon:weatherIconCloudy});
      }
      else if(weatherType.forecast == "Showers" || weatherType.forecast == "Moderate Rain" || weatherType.forecast == "Light Rain" || weatherType.forecast == "Light Showers" || "Heavy Showers"){
        weatherMarker = L.marker(weatherCoordinate[responseWeather.items[0].forecasts.indexOf(weatherType)], {icon:weatherIconShower});
      }
      else if(weatherType.forecast == weatherType.forecast == "Fair" || weatherType.forecast == "Fair (Day)" || weatherType.forecast == "Fair (Night)" ||weatherType.forecast == "Light & Warm"){
        weatherMarker = L.marker(weatherCoordinate[responseWeather.items[0].forecasts.indexOf(weatherType)], {icon:weatherIconFair});
      }
      else if(weatherType.forecast == weatherType.forecast == "Thundery Showers" || weatherType.forecast == "Heavy Showers" || weatherType.forecast == "Heavy Thundery Showers" || weatherType.forecast == "Heavy Thundery Showers with Gusty Winds"){
        weatherMarker = L.marker(weatherCoordinate[responseWeather.items[0].forecasts.indexOf(weatherType)], {icon:weatherIconThunder});
      }
      else if(weatherType.forecast == weatherType.forecast == "Hazy" || weatherType.forecast == "Slightly Hazy" || weatherType.forecast == "Misty"){
        weatherMarker = L.marker(weatherCoordinate[responseWeather.items[0].forecasts.indexOf(weatherType)], {icon:weatherIconHazy});
      }
      else if(weatherType.forecast == "Windy" ){
        weatherMarker = L.marker(weatherCoordinate[responseWeather.items[0].forecasts.indexOf(weatherType)], {icon:weatherIconWind});
      }

      weatherMarker.bindPopup(`<div>${weatherType.area}</div>`);
      weatherMarker.addTo(weatherLayer);
    }
}