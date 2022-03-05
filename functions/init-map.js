function initMap() {
    let map = L.map("singapore-map", { zoomControl: false });
    
    map.setView(singapore, 12);
  
    // setup tilelayer
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom:18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibWFyY3VzY2V5IiwiYSI6ImNsMDZlZ3owZDF4dDMza25wdDJ5ZW16a3kifQ.xtZSvWhCCedrFmk7cFvcRA",
      }
    ).addTo(map)
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "marcuscey/cl06gsxg5000a16r2wo4iivx3",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibWFyY3VzY2V5IiwiYSI6ImNsMDZlZ3owZDF4dDMza25wdDJ5ZW16a3kifQ.xtZSvWhCCedrFmk7cFvcRA",
      }
    ).addTo(map2Layer);
    return map
  }

  
  