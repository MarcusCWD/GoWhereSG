//key and base url has been declared in data-ne-sw.js
async function searchTip(fqid) {
 
    let response = await axios.get(API_BASE_URL + "/places/"+ fqid + "/tips", {
      params: {
        limit: 5,
      },
      headers: {
        Accept: "application/json",
        Authorization: API_KEY,
      },
    });
    return response.data;
  }
  