import styles from './FormPanel.module.css'
export const FormPanel=()=>{
    return (
    <div className={styles.container}>
        <form action="" className={styles.formLogin}>
            Correo
            <input type="email" className="inputLogin" />
            Contraseña
            <input type="password" className="passwordLogin" />
            <button className={styles.button} >Iniciar sesión</button>
        </form>
        <a href="http://">¿Olvidó su contraseña?</a>
    </div>
    )
}