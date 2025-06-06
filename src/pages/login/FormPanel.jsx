import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import logoApp from '../../assets/Logo.png';
import { Button } from '../../components/Button/Button.jsx';
import {auth, testAuth} from './services/LoginAuth.js';
import styles from './styles/FormPanel.module.css';

const LOGIN_STATES = {
    SUCCESS: 'success',
    ERROR: 'error',
    LOADING: 'loading',
} 

export const FormPanel = () => {
    const navegate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginState, setLoginState] = useState(null);
    const [error, setError] = useState('error desconocido');
    
    let result = '';
    
    const handleLogin = async (e) =>{
        //evitamos que se recargue la pagina al inicio
        e.preventDefault();
        setLoginState(LOGIN_STATES.LOADING);
    
        try {
            result = await 
            auth(email, password) //Para hacer testing cambio este metodo de auth(email, password) testAuth(email,password)
            if (result && result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                navegate('/welcome'); 
            } else {
                setError(result?.message || 'Error al iniciar sesión.');
                setLoginState(LOGIN_STATES.ERROR);
                toast.error(error)
            }
        } catch (errorCatch) {
            // Cuando el metodo auth manda un throw New Error
            console.log(errorCatch);
            setError('Error de conexión. Intente nuevamente.');
            setLoginState(LOGIN_STATES.ERROR);
            toast.error(errorCatch.message);
        } 
    }

    return (
        <div className={styles.container}>
            <Toaster richColors position="top-center" />
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
                
                <Button text={"Iniciar Sesión"} type={"submit"}/>
            </form>
            <a href="/recover">¿Olvidó su contraseña?</a>
        </div>
    )
}