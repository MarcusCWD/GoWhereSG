const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3rUd+WwCcMYgPyi7kuRpXjjEw8J3b1CwmPHwUFiiaK5c=";

async function search(lat, lng, query) {
  let ll = lat + "," + lng;

  let response = await axios.get(API_BASE_URL + "/places/search", {
    params: {
      ll: ll,
      v: "20220211",
      query: query,
      radius: currentRadius * radiusMul,
      limit: 50,
      categories: categories(),
    },
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  return response.data;
}
