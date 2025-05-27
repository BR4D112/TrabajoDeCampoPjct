import {LOGIN_URL} from '../../../API/Endpoints.js';
import { mockResponses } from './mockResponses.js';
const url = LOGIN_URL;
/*
 al darle al boton de cerrar sesión, solo eliminamos el token de local storage
*/
const auth = async (email, password) => {

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Un error del servidor');
    }

    const data = await res.json();
    return data;
};
const testAuth = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockResponses.successWithData; 
};

export { auth, testAuth };