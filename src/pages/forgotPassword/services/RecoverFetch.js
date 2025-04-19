export function recoverFetch(email) {
    const url = process.env.NODE_ENV === 'production' 
        ? process.env.REACT_APP_API_URL_PROD + '/recover' 
        : process.env.REACT_APP_API_URL_DEV + '/recover';
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