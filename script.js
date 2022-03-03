const singapore = [1.35, 103.82]; // singapore base coordinate
let categories = "10000,13000,14000,16000,17000,18000,19000" //default categories for foursquare

let map1Layer = L.layerGroup();
let map2Layer = L.layerGroup();
// ------------------FUNCTION: main------------------ //
async function main() {

  let map = initMap();

  let searchResultLayer = L.markerClusterGroup();
  searchResultLayer.addTo(map);

  let weatherLayer = L.layerGroup();
  weatherLayer.addTo(map);

  let infoCenterLayer = L.layerGroup();
  
  
  tabFunction();
  
  window.addEventListener("DOMContentLoaded", async function () {

    //call Infomation center data
    let responseInfoCenter = await getInfoCenter();
    for (info of responseInfoCenter.infomation_center){
      let markerInfo = L.marker(info.geo,  {icon:infoIcon});
      markerInfo.bindPopup(`<div>${info.name}</div>`);
      markerInfo.addTo(infoCenterLayer);
    }

    //call weather data
    await weatherFunc(weatherLayer);

    let searchBtn = document.querySelector("#search-btn");
    searchBtn.addEventListener("click", async function () {

      categoryFunc(); 
      console.log(categories) 
      searchResultLayer.clearLayers(); // get rid of the existing markers
      document.querySelector("#search-results").textContent = ""; // get rid of all search results
      let query = document.querySelector("#search-input").value;
      let bounds = map.getBounds();
      let northeast = bounds.getNorthEast();
      let southwest = bounds.getSouthWest();
      let response = await searchNESW(northeast.lat,northeast.lng, southwest.lat, southwest.lng, query);
      
      // get the div that will display the search results
      let searchResultElement = document.querySelector("#search-results");
  
      // show the number of listings that foursquare query gives back
      let searchResultNumber = document.createElement("div");
      searchResultNumber.className = "text-secondary m-1";
      searchResultNumber.innerText = `Search Results: ${response.results.length}`
      searchResultElement.appendChild(searchResultNumber)

      for (let eachVenue of response.results) {
        let coordinate = [
          eachVenue.geocodes.main.latitude,
          eachVenue.geocodes.main.longitude,
        ];
        let marker = L.marker(coordinate, {icon: searchIcon});
        marker.bindPopup(`<div>${eachVenue.name}</div>`);
        marker.addTo(searchResultLayer);

        let searchEach =  document.createElement("div");
        searchEach.className = "search-each row"
        let searchEachText = document.createElement("div")
        searchEachText.className = "search-each-text col-6"
        let spaceElement = document.createElement("hr");
        spaceElement.className = "m-3";


        //pictures of each listing to be filtered by latest date
        let responsePic = null;
        try {
          responsePic = await searchPic(eachVenue.fsq_id)
        } catch(e) {
          responsePic= []
          console.log('error caught')
        } finally {
          let resultElementPic =  document.createElement("div")
          resultElementPic.className = "search-pic-result col-6"
          if (responsePic.length == 0 ){
            resultElementPic.innerHTML = `<img src="images/singapore-visit.jpg" class="img" >`
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
            let internalImg =  document.createElement("img")
            internalImg.src = imgLatest
            internalImg.className = "img"
            resultElementPic.appendChild(internalImg)
          }
          searchEach.appendChild(resultElementPic);
        }

        //create name of place and click-bility
        let resultElement = document.createElement("a");
        resultElement.innerHTML = eachVenue.name;
        resultElement.className = "search-result";
        resultElement.addEventListener("click", function () {
          map.flyTo(coordinate, 17);
          marker.openPopup();
        });
        searchEachText.appendChild(resultElement);

        //tips of each listing to be filtered by latest date
        let responseTip = null;
        try {
          responseTip = await searchTip(eachVenue.fsq_id)
        } catch(e) {
          responseTip= []
          console.log('error caught')
        } finally {
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
              searchEachText.appendChild(resultElementTip);
            }
        }
        
        searchEach.appendChild(searchEachText);
        searchResultElement.appendChild(searchEach);
        searchResultElement.appendChild(spaceElement);
      }
    
    });

    // base layers: must choose at least one and only one
    let baseLayer = {
      "Street View" : map1Layer,
      "Night View" : map2Layer
    };

    // ovelays: can toggle on or off individual for each layer
    let overlay = {
      "Weather locations" : weatherLayer,
      "Infomation Centers" :  infoCenterLayer
    };

    // add the overlays to the map
    L.control.layers(baseLayer, overlay,).addTo(map,  {icon: searchIcon});  
  });
}
// ------------------ END FUNCTION: main------------------ //

// ------------------ START GLOBAL------------------ //
main();

// ------------------ END GLOBAL------------------ //
