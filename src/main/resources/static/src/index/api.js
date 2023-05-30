export async function ifNotUserMoveLoginPage() {
    try {
        const response = await fetch('http://localhost:8080/api/profile');
        if (response.ok) {

        } else if (response.status === 401) {
            console.log("로그인을 다시 해주세요")
            window.location.replace('http://localhost:8080/login')
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getProfile() {
    try {
        const response = await fetch('http://localhost:8080/api/profile');
        if (response.ok) {
            let data = await response.json();
            return data.result;
        } else if (response.status === 401) {
            console.log("로그인이 필요합니다.")
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getStages() {
    try {
        const response = await fetch('http://localhost:8080/stage/stages');
        if (response.ok) {
            return await response.json();
        } else if (response.status === 401) {
            console.log("로그인이 필요합니다.")
            window.location.replace('http://localhost:8080/login')

            // 테스트: api 주석, stage 더미데이터
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getUserRank() {
    try {
        const response = await fetch('http://localhost:8080/stage/rank');
        if (response.ok) {
            // 데이터 처리
            return await response.json();
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



export async function getStageRank(stageId) {
    try {
        const response = await fetch(`http://localhost:8080/stage/stageRank?stage=${stageId}`);
        if (response.ok) {
            // 데이터 처리
            return await response.json();
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function logout() {
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


export async function deleteUser() {
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



