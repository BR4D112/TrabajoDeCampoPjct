import { useState } from "react";
import { Button } from "../../components/Button/Button";
import {Input} from "../../components/inputs/Input";
import styles from './styles/Recover.module.css';

export const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Correo enviado a:', email);
        } else {
            console.log('Por favor, ingrese un correo válido.');
        }
    }
    return (
        <>
            <h1>Recuperar Contraseña</h1>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <label>Correo Electrónico</label>
                <input 
                    type="email" 
                    required
                    onChange ={(e)=>{setEmail(e.target.value)}}
                    placeholder="Ingrese su correo"
                />
                
                <Button 
                    text={"enviar"} 
                    type="submit"
                /> 
            </form>
        </>
    )
}