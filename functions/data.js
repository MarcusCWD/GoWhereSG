//key and base url has been declared in data-ne-sw.js

async function search(lat, lng, query) {
  let ll = lat + "," + lng;

  let response = await axios.get(API_BASE_URL + "/places/search", {
    params: {
      ll: ll,
      v: "20220211",
      query: query,
      radius: 15000,
      limit: 10,
      // categories: categories(),
    },
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  return response.data;
}
