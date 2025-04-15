import styles from './LoginLeftPanel.module.css'
import uptcMainLogo from '../../assets/uptc-banner-logo.png'
import ingsistemas from '../../assets/ing-sistemas-logo.png'
import logoArq from '../../assets/logo_arq.png'
export const LoginLeftPanel=()=>{
    return (
        <div className={styles.leftPanel} >
        <div className={styles.containerLogos} >
            <img src={uptcMainLogo} className={styles.uptcMainLogo}/>
            <div className={styles.icono}>
                <img src={ingsistemas} />
            </div>
            <div className={styles.icono}>
                <img src={logoArq} />
            </div>
        </div>
        </div>
    )
}