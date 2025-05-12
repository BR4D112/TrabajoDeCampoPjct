import styles from './Input.module.css';

function Input({ type, placeholder, name, value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{placeholder}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.Input}
        required
      />
    </div>
  );
}

export default Input;
