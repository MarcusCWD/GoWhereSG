const singapore = [1.35, 103.82]; // singapore base coordinate
let currentRadius = 5; // default global variable for sliding radius value
const radiusMul = 1000; // global variable for multipying base km to get m

// document.querySelector("#search-radius").addEventListener("input", function () {
//   currentRadius = document.querySelector("#search-radius").value;
// });

// ------------------FUNCTION: main------------------ //
async function main() {
  let map = initMap();
  let searchResultLayer = L.layerGroup();
  searchResultLayer.addTo(map);

  tabFunction();
  // call upon initFunction to start map

  window.addEventListener("DOMContentLoaded", function () {
    let searchBtn = document.querySelector("#search-btn");
    searchBtn.addEventListener("click", async function () {
      searchResultLayer.clearLayers(); // get rid of the existing markers
      let query = document.querySelector("#search-input").value;
      let center = map.getBounds().getCenter();
      let response = await search(center.lat, center.lng, query);
      console.log(response);
      // get the div that will display the search results
      let searchResultElement = document.querySelector("#search-results");

      for (let eachVenue of response.results) {
        let coordinate = [
          eachVenue.geocodes.main.latitude,
          eachVenue.geocodes.main.longitude,
        ];
        let marker = L.marker(coordinate);
        marker.bindPopup(`<div>${eachVenue.name}</div>`);
        marker.addTo(searchResultLayer);

        let resultElement = document.createElement("div");
        resultElement.innerHTML = eachVenue.name;
        resultElement.className = "search-result";
        resultElement.addEventListener("click", function () {
          map.flyTo(coordinate, 16);
          marker.openPopup();
        });

        searchResultElement.appendChild(resultElement);
      }
    });
  });
}
// ------------------ END FUNCTION: main------------------ //

// ------------------ START GLOBAL------------------ //
main();

// ------------------ END GLOBAL------------------ //
