import {ifLoginMoveHome, login} from "./api.js";


let idForm = document.getElementById("id-form")

let passwordForm = document.getElementById("password-form")

let loginButton = document.getElementById("login-button")

ifLoginMoveHome();

loginButton.onclick = function () {
    event.preventDefault();
    let id = idForm.value;
    let password = passwordForm.value;
    login(id, password);
}





