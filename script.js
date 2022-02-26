const singapore = [1.35, 103.82]; // singapore base coordinate
let currentRadius = 15; // default global variable for sliding radius value
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
      // let center = map.getBounds().getCenter();
      // let response = await search(center.lat, center.lng, query);
      let bounds = map.getBounds();
      let northeast = bounds.getNorthEast();
      let southwest = bounds.getSouthWest();
      console.log(northeast, southwest)
      let response = await searchNESW(northeast.lat,northeast.lng, southwest.lat, southwest.lng, query);
      console.log(response);
      // get the div that will display the search results
      let searchResultElement = document.querySelector("#search-results");
      // let searchEach = document.querySelector("#search-each");

      for (let eachVenue of response.results) {
        let coordinate = [
          eachVenue.geocodes.main.latitude,
          eachVenue.geocodes.main.longitude,
        ];
        let marker = L.marker(coordinate);
        marker.bindPopup(`<div>${eachVenue.name}</div>`);
        marker.addTo(searchResultLayer);

        let searchEach =  document.createElement("div");
        searchEach.className = "search-each row"
        let searchEachText = document.createElement("div")
        searchEachText.className = "search-each-text col-6"
        let spaceElement = document.createElement("hr");
        spaceElement.className = "m-3";


        //pictures of each listing to be filtered by latest date
        let responsePic = await searchPic(eachVenue.fsq_id) //return array of object
        let resultElementPic =  document.createElement("img")
        let createDiv = document.createElement("div")
        createDiv.className = "inline-block col-6"
        if (responsePic.length == 0 ){
          resultElementPic.src = "images/singapore-visit.jpg"
          resultElementPic.className = "img"
        }
        else{
          let sortByDate = new Date('1800-01-01T01:01:00')
          let imgLatest = null
          for (byDate of responsePic){
            let newDate = new Date (byDate.created_at)
            if(newDate.getTime() >= sortByDate.getTime()){
              sortByDate = newDate
              imgLatest = byDate.prefix + "500" + byDate.suffix
            }
          }
          resultElementPic.src = imgLatest
          resultElementPic.className = "img"
          createDiv.appendChild(resultElementPic)
        }

        //Tips of each listing to be filtered by latest date
        let responseTip = await searchTip(eachVenue.fsq_id) //return array of object
        let resultElementTip =  document.createElement("div");
        if (responseTip.length == 0 ){
          resultElementTip.innerText = ""
          resultElementTip.className = "search-tip-result"
        }
        else{
          let sortByDate = new Date('1800-01-01T01:01:00')
          let tipLatest = ""
          for (byDate of responseTip){
            let newDate = new Date (byDate.created_at)
            if(newDate.getTime() >= sortByDate.getTime()){
              sortByDate = newDate
              tipLatest = byDate.text 
            }
          }
          resultElementTip.innerText = tipLatest;
          resultElementTip.className = "search-tip-result";
        }

        //create name of place and click-bility
        let resultElement = document.createElement("a");
        resultElement.innerHTML = eachVenue.name;
        resultElement.className = "search-result";
        resultElement.addEventListener("click", function () {
          map.flyTo(coordinate, 16);
          marker.openPopup();
        });

        searchEach.appendChild(createDiv);
        searchEachText.appendChild(resultElement);
        searchEachText.appendChild(resultElementTip);
        searchEach.appendChild(searchEachText);
        searchResultElement.appendChild(searchEach);
        searchResultElement.appendChild(spaceElement);
        
      }
      
    });
  });
}
// ------------------ END FUNCTION: main------------------ //

// ------------------ START GLOBAL------------------ //
main();

// ------------------ END GLOBAL------------------ //
