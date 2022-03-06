function card1Func(searchResultLayer, map){
    window.addEventListener("DOMContentLoaded", async function () {
        let searchBtnCard1 = document.querySelector("#card-btn1");
        searchBtnCard1.addEventListener("click", async function () {
    
          searchResultLayer.clearLayers(); // get rid of the existing markers
          document.querySelector("#search-results").textContent = ""; // get rid of all search results
          
          let query = "Singapore Flyer"
          let response = await searchNESW(1.3716150357416135,103.92654418945314, 1.2291728245702975, 103.76157760620119, query);
          // get the div that will display the search results
          let searchResultElement = document.querySelector("#search-results");
          map.flyTo([1.2893,103.8631], 17);
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
            marker.bindPopup(`<div>${eachVenue.name}</div> <div>${eachVenue.location.formatted_address}</div>`);
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
                resultElementPic.innerHTML = `<img src="images/jewel-singapore.jpg" class="img" >`
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
            resultElement.innerHTML = `<div>${eachVenue.name}</div>`;
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
    })
}
