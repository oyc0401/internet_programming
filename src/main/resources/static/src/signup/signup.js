import {signup} from "./api.js";

let nicknameForm = document.getElementById("nickname-form")

let idForm = document.getElementById("id-form")

let passwordForm = document.getElementById("password-form")

let signupButton = document.getElementById("signup-button")


signupButton.onclick = function () {
    let id = idForm.value;
    let password = passwordForm.value;
    let nickname = nicknameForm.value
    signup(id, password,nickname);
}


