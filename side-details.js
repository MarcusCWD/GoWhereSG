function sideDetails(response, map, searchResultLayer) {
  for (let eachVenue of response.results) {
    let coordinate = [
      eachVenue.geocodes.main.latitude,
      eachVenue.geocodes.main.longitude,
    ];
    let marker = L.marker(coordinate);
    marker.bindPopup(`<div>${eachVenue.name}</div>`);
    marker.addTo(searchResultLayer);

    let resultElement = document.createElement("div");
    let insideResultElement1 = document.createElement("div");
    let insideResultElement2 = document.createElement("div");
    let insideResultElement3 = document.createElement("button");
    resultElement.className = "individualResult";
    insideResultElement3.className = "zoomButton btn btn-primary";
    insideResultElement1.innerHTML = eachVenue.name;
    insideResultElement2.innerHTML =
      "Address: " + eachVenue.location.formatted_address;
    insideResultElement3.addEventListener("click", function () {
      map.flyTo(coordinate, 16);
      marker.openPopup();
    });

    resultElement.appendChild(insideResultElement1);
    resultElement.appendChild(insideResultElement2);
    resultElement.appendChild(insideResultElement3);
    document.querySelector("#search-results").appendChild(resultElement);
  }
  
}
