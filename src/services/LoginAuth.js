const serverURL =''

const auth = async(email, password)=>{
    const response = await fetch (serverURL,{
        method:'POST',
        body: JSON.stringify({email, password})  
    })
    return response;
}
export default auth