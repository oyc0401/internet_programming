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