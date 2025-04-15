import styles from '../../assets/LoginStyles/FormPanel.module.css'
import logoApp from '../../assets/Logo.png'


export const FormPanel=()=>{
    return (
    <div className={styles.container}>
        <img src={logoApp}  style={{ objectFit:"scale-down", height: "max-content", width: "300px", alignContent:"center"}}/>        
        <h2>Iniciar Sesión</h2>
        <form action="" className={styles.formLogin}>
            <label>Correo</label>
            <input type="email" className={styles.inputLogin} placeholder='Ingrese el correo' required/>
            
            <label>Contraseña</label>
            <input type="password" className={styles.inputPassword} placeholder='Ingrese la contraseña' required/>
            
            <button className={styles.button} >Iniciar Sesión</button>
        </form>
        <a href="http://">¿Olvidó su contraseña?</a>
    </div>
    )
}