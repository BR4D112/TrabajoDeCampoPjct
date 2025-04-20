import { RECOVER_URL } from '../../../API/Endpoints.js';
const url = RECOVER_URL;
export function recoverFetch(email) {
    let response;
    try {
        response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
        });
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Network error');
    }
    return response
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            return data;
        });
}