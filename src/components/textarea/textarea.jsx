import styles from './textarea.module.css'; // se reconocen y diferencian mayusculas y minusculas

function Textarea({ name, placeholder, value, onChange }) {
  return (
    <div className={styles.textareaContainer}>
      <label htmlFor={name}>{placeholder}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.Textarea}
        required
      />
    </div>
  );
}

export default Textarea;
