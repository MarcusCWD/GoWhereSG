document.querySelector('#form-btn').addEventListener('click', function () {
    let hasEmailError = false;
    let hasMsgError = false;
    
    let eForm = document.querySelector('#email-form');
    if (!eForm.value) {
        hasEmailError = true;
    }
    if (eForm.value && !eForm.value.includes("@")) {
        hasEmailError = true;
    }

    let mForm = document.querySelector('#message-form')
    if (!mForm.value){
        hasMsgError = true;
    }
    if (mForm.value.length < 20){
        hasMsgError = true;
    }
    console.log(mForm.value.length)


    let emailError = document.querySelector('#email-error');
    emailError.innerHTML = '';

    if (hasEmailError) {
        emailError.style.display = 'block';
        emailError.innerHTML += `<p >Please provide a valid email address</p>`;
    }
    
    let msgError = document.querySelector('#message-error');
    msgError.innerHTML = '';

    if (hasMsgError) {
        msgError.style.display = 'block';
        msgError.innerHTML += `<p >Please provide a valid message</p>`;
    }

    if (!hasEmailError && !hasMsgError){
        emailError.innerHTML = '';
        msgError.innerHTML = '';
        eForm.value='';
        mForm.value='';
        msgError.innerHTML += `<p >Message has been sent!</p>`;
    }
})