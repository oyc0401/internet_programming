import {login} from "./api.js";


let idForm = document.getElementById("id-form")

let passwordForm = document.getElementById("password-form")

let loginButton = document.getElementById("login-button")


loginButton.onclick = function () {
    let id = idForm.value;
    let password = passwordForm.value;
    login(id, password);
}





