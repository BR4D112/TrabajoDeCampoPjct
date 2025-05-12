import styles from './ConfirmModal.module.css';
import { Button } from '../Button/Button';
import { ButtonDeny } from '../ButtonDeny/ButtonDeny';

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.buttons}>
          <ButtonDeny type="button" onClick={onCancel} text="Cancelar"/>
          <Button type="submit" onClick={onConfirm} text="Enviar" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;