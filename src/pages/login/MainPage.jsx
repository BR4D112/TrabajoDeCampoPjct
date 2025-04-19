import { FormPanel } from "./FormPanel"
import { LoginLeftPanel } from "./LoginLeftPanel"
import styles from './styles/MainContainer.module.css'
export const MainPage= ()=> { 
    return (
        <div className={styles.container}>
            <LoginLeftPanel/>
            <FormPanel/>
        </div>
    )
}


