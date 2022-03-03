 //when clicked, do:
function categoryFunc(){

  let returnFilter = checkBox();

  //check to see if returnFilter checkbox return true (has items in array)
  if (returnFilter){
    for (filter of returnFilter){
      if (filter == "entertainment"){
        categories = "10000"
      }
      else if (filter == "lodging"){
        categories = "19009"
      }
      else if (filter == "food"){
        categories = "13000"
      }
      else if (filter == "shop"){
        categories = "17000"
      }
      else if (filter == "eco"){
        categories = "16000"
      }
    }
  }
  return categories
}
