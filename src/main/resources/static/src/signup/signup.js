
let nicknameForm = document.getElementById("nickname-form")

let idForm = document.getElementById("id-form")

let passwordForm = document.getElementById("password-form")

let signupButton = document.getElementById("signup-button")


signupButton.onclick = async function () {
    let id = idForm.value;
    let password = passwordForm.value;
    let nickname = nicknameForm.value

    let response = await signup(id, password, nickname);

    if (response.ok) {
        history.back();
        console.log(document);
    } else if (response.status === 400) {
        showNotification(await response.text())
    } else {
        showNotification(await response.text())
    }

}

const notification = document.getElementById('notification-container')

const showNotification = (message) => {
    notification.classList.add('show')
    notification.textContent = message;
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}


