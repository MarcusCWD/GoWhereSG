const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3rUd+WwCcMYgPyi7kuRpXjjEw8J3b1CwmPHwUFiiaK5c=";

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
    },
        headers: {
            Accept: "application/json",
            Authorization: API_KEY,
        },
    });
  return response.data;
}
