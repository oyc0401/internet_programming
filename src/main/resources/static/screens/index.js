getProfile();

async function getProfile() {
    try {
        const response = await fetch('http://localhost:8080/api/profile');
        if (response.ok) {
            // const data = await response.json();
        } else if (response.status === 401) {
            console.log("로그인이 필요합니다.")
            window.location.replace('http://localhost:8080/login')
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


async function logout() {
    let param = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch('http://localhost:8080/api/logout', param);
        if (response.ok) {
            window.location.replace('http://localhost:8080/login')
        } else if (response.status === 400) {

        }
    } catch (error) {
        console.error('Error:', error);
    }
}


async function deleteUser() {
    let param = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch('http://localhost:8080/api/delete', param);
        if (response.ok) {
            console.log("회원 탈퇴 성공")
            window.location.replace('http://localhost:8080/login')
        } else if (response.status === 401) {
            console.log("로그인이 필요합니다.")
            window.location.replace('http://localhost:8080/login')
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

