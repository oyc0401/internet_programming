let username = "oyc0401";
let password = "qwe123";

const body = {
    "username": username,
    "password": password,
}


async function login() {
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
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

const signupBody = {
    "username": username,
    "password": password,
    "nickname": "초코"
}

async function signup() {
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
            // window.location.replace('http://localhost:8080')
            alert("회원가입 했습니다.")
        } else if (response.status === 400) {
            alert("이미 있는 계정 입니다.")
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

