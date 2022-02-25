//key and base url has been declared in data.js
async function searchPic(fqid) {
 
  let response = await axios.get(API_BASE_URL + "/places/"+ fqid + "/photos", {
    params: {
      limit: 50,
    },
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  return response.data;
}
