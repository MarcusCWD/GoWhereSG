async function getInfoCenter() {
    let response = await axios.get(
      "data/infomation-center.json"
    );
    return response.data;
}