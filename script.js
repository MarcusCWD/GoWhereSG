// ------------------global declarations------------------ //
const singapore = [1.35, 103.82]; // singapore base coordinate
let currentRadius = 5; // default global variable for sliding radius value
const radiusMul = 1000; // global variable for multipying base km to get m


// ------------------FUNCTION: main------------------ //

// ------------------FUNCTION: main------------------ //
async function main() {
  function init() {
    let map = initMap();
    let searchResultLayer = L.layerGroup();
    searchResultLayer.addTo(map);
    let pinLayer = L.layerGroup();
    pinLayer.addTo(map);
    let pinRadiusLayer = L.layerGroup();
    pinRadiusLayer.addTo(map);
    let currentPin = 0;

    window.addEventListener("DOMContentLoaded", function () {
      document
        .querySelector("#search-btn")
        .addEventListener("click", async function () {
          currentRadius = 15;
          pinLayer.clearLayers(); // get rid of the existing markers
          searchResultLayer.clearLayers(); // get rid of the existing markers
          pinRadiusLayer.clearLayers(); // get rid of the existing markers
          document.querySelector("#search-results").textContent = ""; // get rid of all search results
          let query = document.querySelector("#search-input").value;
          let center = map.getBounds().getCenter();
          let response = await search(center.lat, center.lng, query);

          sideDetails(response,map, searchResultLayer);
        });
      document
        .querySelector("#pin-btn")
        .addEventListener("click", async function () {
          pinLayer.clearLayers(); // get rid of the existing markers
          searchResultLayer.clearLayers(); // get rid of the existing markers
          pinRadiusLayer.clearLayers(); // get rid of the existing markers

          let pin = L.marker(singapore, {
            draggable: "true",
          });
          pin.addTo(pinLayer);

          pin.addEventListener("mousedown", function () {
            pinRadiusLayer.clearLayers(); // get rid of the existing markers
            searchResultLayer.clearLayers(); // get rid of the existing markers
            currentRadius = document.querySelector("#search-radius").value;
            document.querySelector("#search-results").textContent = ""; // get rid of all search results
          });

          pin.addEventListener("mouseup", async function () {
            currentPin = pin.getLatLng();
            console.log(currentPin);
            let pinCircle = L.circle(currentPin, {
              color: "green",
              fillColor: "lightgreen",
              fillOpacity: 0.1,
              radius: currentRadius * radiusMul + 500, //500m allowance so that marker will not overlap outside
              draggable: "true",
            });
            pinCircle.addTo(pinRadiusLayer);

            let query = document.querySelector("#search-input").value;
            let response = await search(currentPin.lat, currentPin.lng, query);

            sideDetails(response, map, searchResultLayer);
          });
        });
    });
  }

  init();
}
// ------------------ END FUNCTION: main------------------ //



// ------------------ START GLOBAL------------------ //
main();
// ------------------ END GLOBAL------------------ //