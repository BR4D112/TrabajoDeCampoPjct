import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { ButtonDeny } from "../../components/ButtonDeny/ButtonDeny"; // <-- importa tu ButtonDeny si no lo tienes
import { TopBar } from "../../components/TopBar/TopBar"; // Nuevo import
import styles from './styles/Recover.module.css';
import { sendingEmail, sendingNewPassword } from "./services/RecoverFetch";
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

    const handleSetEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

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

    const PasswordForm = () => (
        <div className={styles.Container}>
            <h2>Restablecer contraseña</h2>
            <form className={styles.Form} onSubmit={handleSubmitNewPassword}>
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <TopBar /> {/* Aquí se usa el componente reutilizable */}
            {
                status === RECOVER_STATE.IDLE || status === RECOVER_STATE.INVALID_EMAIL ? (
                    <div className={styles.Box}>
                        <h2>Recuperar cuenta</h2>
                        <p>Ingrese su correo de inicio de sesión. Allí se enviará un enlace de instrucciones para el restablecimiento.</p>
                        <form className={styles.Form} onSubmit={handleSubmit}>
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleSetEmail}
                                placeholder="Ingrese su correo electrónico"
                                required
                            />
                            <div className={styles.ButtonGroup}>
                                <ButtonDeny text="Cancelar" type="button" onClick={() => setStatus(RECOVER_STATE.IDLE)} />
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
                )
            }
        </div>
    );
};
