/* Use this area for pseudo - coding:



*/

// Query selectors

const reg_btn = document.querySelector('#register-btn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const disp_btn = document.querySelector("#display-btn");
const disp_area = document.querySelector(".display-area");


// Event listeners
reg_btn.addEventListener('click', storeToLocal);
disp_btn.addEventListener("click", pullFromLocal);


// Functions

function storeToLocal() {
    let credentials = {name: name.value, email: email.value}
    let sCredentials = JSON.stringify(credentials);

    localStorage.setItem(email.value, sCredentials);
}

function pullFromLocal() {
    disp_area.innerHTML = '';
    // for (let [key, value] of Object.entries(localStorage)) {
    for (let i = 0; i < localStorage.length; i++) {
            let credentials = JSON.parse(localStorage.getItem(localStorage.key(i)));
            display(credentials.name, credentials.email);
    }
}

function display(name, email) {
    let p = document.createElement("P");
    p.appendChild(document.createTextNode(`name: ${name}, email: ${email}`));
    disp_area.appendChild(p);

}