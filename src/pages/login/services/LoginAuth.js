const serverURL =''
/*
 al darle al boton de cerrar sesión, solo eliminamos el token de local storage
 
*/
const auth = async(email, password)=>{
    const response = await fetch (serverURL,{
        method:'POST',
        body: JSON.stringify({email, password})  
    })
    return response;
}
export default auth