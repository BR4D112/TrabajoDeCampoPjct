// SelectGroupCountModal.js
import styles from '../../modal/SearchModal.module.css';
import { Button } from '../../Button/Button';
import { ButtonDeny } from '../../ButtonDeny/ButtonDeny';

const SelectGroupCountModal = ({ subject, onSubmit, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(e.target.elements.groupCount.value, 10);
    if (!isNaN(count) && count > 0) {
      onSubmit(count);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>¿Cuántos grupos para {subject.name}?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupCount"
            placeholder="Número de grupos"
            required
            min={1}
          />
          <div className={styles.buttons}>
            <ButtonDeny type="button" onClick={onCancel} text="Cancelar" />
            <Button type="submit" text="Aceptar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectGroupCountModal;
