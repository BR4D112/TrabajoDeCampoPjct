import { useState } from "react";
import { Button } from "../../components/Button/Button";
import styles from './styles/Recover.module.css';
import { sendingEmail, sendingNewPassword } from "./services/RecoverFetch";
import logoNegative from "../../assets/logo-negative.png";
import { Toaster, toast } from "sonner";

const RECOVER_STATE = {
    IDLE: 'idle',
    SENDING: 'enviando',
    VALID_EMAIL: 'email valido',
    INVALID_EMAIL: 'email invalido',
    SENDING_NEW_PASSWORD: 'enviando nueva contraseña',
    INVALID_PASSWORD: 'contraseña invalida',
    PASSWORD_CHANGED: 'contraseña cambiada',
};

export const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(RECOVER_STATE.IDLE);
    const [step, setStep] = useState('email'); // "email" | "password"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(RECOVER_STATE.SENDING);
        try {
            await sendingEmail(email);
            toast.success(`Correo enviado a: ${email}`);
            setStatus(RECOVER_STATE.VALID_EMAIL);
            setStep('password'); // Cambio a siguiente paso
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
    /*
    Con este quise probar el error que me salía, de re renderizado del componente
    */ 
    return (
        <div className={styles.Page}>
            <Toaster position="top-center" richColors closeButton={false} expand={false} theme="dark" />
            <Header />

            <div className={styles.Container}>
                {step === 'email' && (
                    <>
                        <h2>Recuperar cuenta</h2>
                        <p>Ingrese su correo de inicio de sesión. Allí se enviará un enlace de instrucciones para el restablecimiento.</p>
                        <form onSubmit={handleSubmit}>
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingrese su correo electrónico"
                                required
                            />
                            <div className={styles.ButtonGroup}>
                                <Button text="Cancelar" type="button" onClick={() => setEmail('')} />
                                <Button text="Aceptar" type="submit" />
                            </div>
                        </form>
                    </>
                )}

                {step === 'password' && (
                    <>
                        <h2>Restablecer contraseña</h2>
                        <form onSubmit={handleSubmitNewPassword}>
                            <label>Nueva Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su nueva contraseña"
                                required
                            />
                            <div className={styles.ButtonGroup}>
                                <Button text="Cancelar" type="button" onClick={() => {
                                    setPassword('');
                                    setStep('email');
                                }} />
                                <Button text="Aceptar" type="submit" />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
