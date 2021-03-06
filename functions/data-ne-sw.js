const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3nA3u+r0IdJhiSNz8KcGocr2dRb5T1L/jZ4HUVAI53KM=";

async function searchNESW(neLat,neLng,swLat,swLng, query) {
    let ne = neLat + "," + neLng;
    let sw = swLat + "," + swLng;
    let response = await axios.get(API_BASE_URL + "/places/search", {
        params: {
        ne: ne,
        sw: sw,
        v: "20220211",
        query: query,
        limit: 30,
        categories: categories
    },
        headers: {
            Accept: "application/json",
            Authorization: API_KEY,
        },
    });
  return response.data;
}
