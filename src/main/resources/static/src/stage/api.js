export async function getStage(number) {
    let stage = [[2]];
    try {
        const response = await fetch(`http://localhost:8080/stage?stage=${number}`);
        if (response.ok) {
            const data = await response.json();
            data.map = JSON.parse(data.map);
            stage = data;
        } else {
            throw new Error('Error: ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return stage
}

export async function clearStage(id, move) {

    let body = {
        "stageId": id,
        "move": move,
    }

    let param = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    try {
        const response = await fetch(`http://localhost:8080/stage/clear`, param);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

        } else if (response.status === 401) {
            console.log("로그인을 다시 해주세요")
        } else {
            console.log("error?: " + response.status)
        }
    } catch (error) {
        console.error('Error:', error);
    }

}


