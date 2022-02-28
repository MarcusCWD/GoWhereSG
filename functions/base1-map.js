function init2Map() {
    let map2 = L.map("singapore-map");
    map2.setView(singapore, 12);
  
    // setup tilelayer
    L.tileLayer(
      " https://api.mapbox.com/styles/v1/{id}/.html?title=view&access_token={accessToken}&zoomwheel=true&fresh=true#13/33.75001/-118.4106",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "marcuscey/cl06eseuy001515munj4wfs1h",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibWFyY3VzY2V5IiwiYSI6ImNsMDZlZ3owZDF4dDMza25wdDJ5ZW16a3kifQ.xtZSvWhCCedrFmk7cFvcRA",
      }
    ).addTo(map2Layer);
    return map2;
  }
