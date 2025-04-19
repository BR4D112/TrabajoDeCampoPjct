import { Button } from "../../components/Button/Button";

export const RecoverPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        // Aquí puedes agregar la lógica para enviar el correo de recuperación
        console.log('Correo enviado a:', email);
    }
    return (
        <div>
            <h1>Recuperar Contraseña</h1>
            <form>
                <label>Correo Electrónico</label>
                <input type="email" placeholder="Ingrese su correo" required />
                <Button text={"enviar"} 
                 onClick={handleSubmit}
                /> 
            </form>
        </div>
    )
}