import {getDomain} from "../../navigator/navigator.js";

let domain = getDomain();

export async function isUser() {
    try {
        return await fetch(`${domain}/api/profile`);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getProfile() {
    try {
        return await fetch(`${domain}/api/profile`);
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
        return await fetch(`${domain}/api/login`, param);
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
        return await fetch(`${domain}/api/logout`, param);
    } catch (error) {
        console.error('Error:', error);
    }
}

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
        return await fetch(`${domain}/api/signup`, param);
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
        return await fetch(`${domain}/api/delete`, param);
    } catch (error) {
        console.error('Error:', error);
    }
}

