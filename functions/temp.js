//when clicked, do:
let returnFilter = checkBox();

for (let eachVenue of response.results) {
    for (filter of returnFilter){
        if (filter == "entertainment" && eachVenue.categories[0].id <= 10056 && eachVenue.categories[0].id >= 10000){

        }
        if (filter == "lodging"){
            
        }
        if (filter == "food"){
            
        }
        if (filter == "shop"){
            
        }
        if (filter == "eco"){
            
        }
    }






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
    let responsePic = await searchPic(eachVenue.fsq_id) //return array of object
    // console.log(responsePic)
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
    // console.log(responseTip)
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