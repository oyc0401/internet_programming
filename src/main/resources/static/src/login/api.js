export async function ifLoginMoveHome() {
    try {
        const response = await fetch('http://localhost:8080/api/profile');
        if (response.ok) {
            console.log("이미 로그인 되어있습니다.")
            window.location.replace('http://localhost:8080')
        } else if (response.status === 401) {

        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function login(username, password) {
    const body = {
        "username": username,
        "password": password,
    }

    let param = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    try {
        const response = await fetch('http://localhost:8080/api/login', param);
        if (response.ok) {
            window.location.replace('http://localhost:8080')
        } else if (response.status === 401) {
            showNotification()
        } else {
            console.log(response)
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
const notification = document.getElementById('notification-container')

const showNotification = () => {
    notification.classList.add('show')
    notification.textContent="잘못된 아이디 또는 비밀번호 입니다.";
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}