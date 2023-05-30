import {getDomain} from "../../navigator/navigator.js";

let domain=getDomain();

export async function getStages() {
    try {
        return await fetch(`${domain}/stage/stages`);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getStage(stageId) {
    try {
        return await fetch(`${domain}/stage?stage=${stageId}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getUserRank() {
    try {
        return await fetch(`${domain}/stage/rank`);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getStageRank(stageId) {
    try {
        return await fetch(`${domain}/stage/stageRank?stage=${stageId}`);
    } catch (error) {
        console.error('Error:', error);
    }
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
        const response = await fetch(`${domain}/stage/clear`, param);
        if (response.ok) {

            return await response.json();

        } else if (response.status === 401) {
            console.log("로그인을 다시 해주세요")
        } else {
            console.log("error?: " + response.status)
        }
    } catch (error) {
        console.error('Error:', error);
    }

}


