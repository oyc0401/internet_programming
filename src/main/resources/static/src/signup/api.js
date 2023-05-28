export async function signup(username, password, nickname) {
    const signupBody = {
        "username": username,
        "password": password,
        "nickname": nickname
    }
    let param = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupBody)
    };

    try {
        const response = await fetch('http://localhost:8080/api/signup', param);
        if (response.ok) {
            // alert("회원가입 했습니다.")
            history.back();
            console.log(document);
        } else if (response.status === 400) {
            showNotification(await response.text())
        } else {
            showNotification(await response.text())
        }

    } catch (error) {
        console.error('Error:', error);
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