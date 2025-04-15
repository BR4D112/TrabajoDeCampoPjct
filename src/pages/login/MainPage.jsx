import { FormPanel } from "./FormPanel"
import { LoginLeftPanel } from "./LoginLeftPanel"
import styles from '../../assets/LoginStyles/Container.module.css'
export const MainPage= ()=> { 
    return (
        <div className={styles.container}>
            <LoginLeftPanel/>
            <FormPanel/>
        </div>
    )
}


