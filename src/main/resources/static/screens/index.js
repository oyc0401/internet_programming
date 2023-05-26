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

getProfile();