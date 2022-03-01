function checkBox(){
    let allCheckboxes = document.getElementsByClassName('check-form');
    let filterSelection = [];
    for (let checkbox of allCheckboxes) {
        if (checkbox.checked == true) {
            filterSelection.push(checkbox.value);
        }
    }
    return filterSelection
}
