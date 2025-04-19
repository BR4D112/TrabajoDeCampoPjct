import { useState } from 'react';
import styles from './styles/FormPanel.module.css';
import logoApp from '../../assets/Logo.png';
import { Button } from '../../components/Button/Button.jsx';
import auth from './services/LoginAuth.js';

const LOGIN_STATES = {
    SUCCESS: 'success',
    ERROR: 'error',
    LOADING: 'loading',
} 

export const FormPanel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const handleLogin = async (e) =>{
        e.preventDefault(); 
        let result = '';
        try {
            result = await auth(email, password)            
            alert(result.text());
        } catch (error) {
            console.log();
        } 
    }


    return (
        <div className={styles.container}>
            <img src={logoApp} className={styles.imageLogo} />
            <h2 className={styles.iniciarSesion}>
            Iniciar Sesión
            </h2>
            
            <label style={{ fontSize: '20px' }}>Ingrese sus credenciales</label>
            <form action="" onSubmit={handleLogin} className={styles.formLogin}>
                <label>Correo</label>
                <input 
                type="email" 
                className={styles.inputLogin} 
                placeholder='Ingrese el correo' 
                onChange={(e)=>{setEmail(e.target.value)}}
                required 
                />

                <label>Contraseña</label>
                <input
                type="password"
                className={styles.inputPassword}
                placeholder='Ingrese la contraseña'
                onChange={(e)=>{setPassword(e.target.value)}}
                required 
                />
                <Button text={"Iniciar Sesión"}/>
            </form>
            <a href="/recover">¿Olvidó su contraseña?</a>
        </div>
    )
}