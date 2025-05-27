// SelectGroupCountModal.js
import styles from '../../modal/SearchModal.module.css';
import { Button } from '../../Button/Button';
import { ButtonDeny } from '../../ButtonDeny/ButtonDeny';
import Input from '../../inputs/Input';

const SelectGroupCountModal = ({ subject, onSubmit, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(e.target.elements.groupCount.value, 10);
    const sessionCount = parseInt(e.target.elements.sessionCount.value, 10);
    if (!isNaN(count) && count > 0 && !isNaN(sessionCount) && sessionCount > 0) {
      onSubmit(count, sessionCount);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Asignación de recursos a {subject.name}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            name="groupCount"
            placeholder="Número de grupos"
            required
            min={1}
          />
          <Input
            type="number"
            name="sessionCount"
            placeholder="Número de sesiones por grupo"
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
