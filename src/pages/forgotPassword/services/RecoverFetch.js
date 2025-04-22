import { RECOVER_URL, PASSWORD_RESET } from '../../../API/Endpoints.js';

async function sendRequest(url, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Network error');
    }
}

export function sendingEmail(email) {
    return sendRequest(RECOVER_URL, { email });
}

export function sendingNewPassword(password) {
    return sendRequest(PASSWORD_RESET, { password });
}