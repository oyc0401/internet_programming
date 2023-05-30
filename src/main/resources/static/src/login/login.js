import {isUser,login} from "../api/userApi.js";


let idForm = document.getElementById("id-form")

let passwordForm = document.getElementById("password-form")

let loginButton = document.getElementById("login-button")


const response = await isUser();
if (response.ok) {
    console.log("이미 로그인 되어있습니다.")
    window.location.replace('http://localhost:8080')
}


loginButton.onclick = async function () {
    event.preventDefault();
    let id = idForm.value;
    let password = passwordForm.value;

    let response = await login(id, password);
    if (response.ok) {
        window.location.replace('http://localhost:8080')
    } else if (response.status === 401) {
        showNotification();
    } else {
        console.log(response)
    }
}

const notification = document.getElementById('notification-container')

const showNotification = () => {
    notification.classList.add('show')
    notification.textContent = "잘못된 아이디 또는 비밀번호 입니다.";
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}





