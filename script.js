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

        //pictures of each listing to be filtered by latest date
        let responsePic = await searchPic(eachVenue.fsq_id) //return array of object
        let resultElementPic =  document.createElement("div")
        console.log(responsePic.length)
        if (responsePic.length == 0 ){
          resultElementPic.innerHTML = `<img src= "images/singapore-visit.jpg" class="img" >`
          resultElementPic.className = "search-pic-result"
        }
        else{
          let sortByDate = new Date('1800-01-01T01:01:00')
          let imgLatest = null
          for (byDate of responsePic){
            let newDate = new Date (byDate.created_at)
            if(newDate.getTime() >= sortByDate.getTime()){
              sortByDate = newDate
              imgLatest = byDate.prefix + "200" + byDate.suffix
            }
          }
          resultElementPic.innerHTML = `<img src=${imgLatest} class="img">`
          resultElementPic.className = "search-pic-result"
        }
        searchResultElement.appendChild(resultElementPic);
   

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
