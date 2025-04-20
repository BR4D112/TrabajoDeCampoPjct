import {LOGIN_URL} from '../../../API/Endpoints.js';
import { mockResponses } from './mockResponses.js';
const url = LOGIN_URL;
/*
 al darle al boton de cerrar sesión, solo eliminamos el token de local storage
*/
const auth = async(email, password)=>{
    console.log("server url", url);
    console.log("email", email);
    console.log("password", password);
    console.log(import.meta.env);
    const response = await fetch (url,{
        method:'POST',
        body: JSON.stringify({email, password})  
    })
    return response
        .then((res) => {
            if (!res.ok) {
                throw new Error('Un error del servidor');
            }
            return res.json();
        })
        .then((data) => {
            return data;
        });
}
const testAuth = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockResponses.successWithData; 
};

export { auth, testAuth };