import styles from './Input.module.css';
export function Input({type, placeholder}) {
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            className={styles.Input}
            required 
        />
    );
}