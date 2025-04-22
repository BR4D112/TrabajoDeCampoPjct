import { useState } from "react";
import { Button } from "../../components/Button/Button";
import styles from './styles/Recover.module.css';
import { sendingEmail, sendingNewPassword } from "./services/RecoverFetch";
import logoNegative from "../../assets/logo-negative.png";
import { Toaster, toast } from "sonner";

export const RecoverPassword = () => {
    const RECOVER_STATE = {
        IDLE: 'idle',
        SENDING: 'enviando',
        VALID_EMAIL: 'email valido',
        INVALID_EMAIL: 'email invalido',
        SENDING_NEW_PASSWORD: 'enviando nueva contraseña',
        INVALID_PASSWORD: 'contraseña invalida',
        PASSWORD_CHANGED: 'contraseña cambiada',
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(RECOVER_STATE.IDLE);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(RECOVER_STATE.SENDING);
        try {
            await sendingEmail(email);
            toast.success(`Correo enviado a: ${email}`);
            setStatus(RECOVER_STATE.VALID_EMAIL);
        } catch (error) {
            toast.error('Error al enviar el correo.');
            setStatus(RECOVER_STATE.INVALID_EMAIL);
        }
    };

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        setStatus(RECOVER_STATE.SENDING_NEW_PASSWORD);
        try {
            await sendingNewPassword(password);
            toast.success('Contraseña cambiada exitosamente.');
            setStatus(RECOVER_STATE.PASSWORD_CHANGED);
        } catch (error) {
            toast.error('Error al cambiar la contraseña.');
            setStatus(RECOVER_STATE.INVALID_PASSWORD);
        }
    };

    const Header = () => (
        <header className={styles.Header}>
            <a href="/">
                <img src={logoNegative} alt="Logo regresar al inicio" />
            </a>
            <h1>Sistema de Asignación y Gestión Educativa</h1>
        </header>
    );

    const RecoverForm = () => (
        <div className={styles.Container}>
            <h2>Recuperar cuenta</h2>
            <p>Ingrese su correo de inicio de sesión. Allí se enviará un enlace de instrucciones para el restablecimiento.</p>
            <form 
            className={styles.Form} onSubmit={handleSubmit}>
                <label>Correo Electrónico</label>
                <input
                type="email"
                value={email} // Vincula el input al estado
                onChange={handleSetEmail} // Actualiza el estado al escribir
                placeholder="Ingrese su correo electrónico"
                required
                />
                <div className={styles.ButtonGroup}>
                    <Button text="Cancelar" type="button" onClick={() => setStatus(RECOVER_STATE.IDLE)} />
                    <Button text="Aceptar" type="submit" />
                </div>
            </form>
            {
                email !== '' && (
                    <div>
                        <p>Correo electrónico ingresado: {email}</p>
                    </div>
                )
            }
        </div>
    );
    const handleSetEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const PasswordForm = () => (
        <div className={styles.Container}>
            <h2>Restablecer contraseña</h2>
            <form className={styles.Form} onSubmit={handleSubmitNewPassword}>
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password} // Vincula el input al estado
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al escribir
                    placeholder="Ingrese su nueva contraseña"
                    required
                />
                <div className={styles.ButtonGroup}>
                    <Button text="Cancelar" type="button" onClick={() => setStatus(RECOVER_STATE.IDLE)} />
                    <Button text="Aceptar" type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className={styles.Page}>
            <Toaster position="top-center" richColors closeButton={false} expand={false} theme="dark" />
            <Header />
            {status === RECOVER_STATE.IDLE || status === RECOVER_STATE.INVALID_EMAIL ? (
                //en este componente lo cambié para no hacer re renderizado, el metodo RecoverForm 
                <div className={styles.Container}>
                <h2>Recuperar cuenta</h2>
                <p>Ingrese su correo de inicio de sesión. Allí se enviará un enlace de instrucciones para el restablecimiento.</p>
                <form 
                className={styles.Form} onSubmit={handleSubmit}>
                    <label>Correo Electrónico</label>
                    <input
                    type="email"
                    value={email} // Vincula el input al estado
                    onChange={handleSetEmail} // Actualiza el estado al escribir
                    placeholder="Ingrese su correo electrónico"
                    required
                    />
                    <div className={styles.ButtonGroup}>
                        <Button text="Cancelar" type="button" onClick={() => setStatus(RECOVER_STATE.IDLE)} />
                        <Button text="Aceptar" type="submit" />
                    </div>
                </form>
                {
                    email !== '' && (
                        <div>
                            <p>Correo electrónico ingresado: {email}</p>
                        </div>
                    )
                }
            </div>
            ) : (
                <PasswordForm />
            )}
        </div>
    );
};