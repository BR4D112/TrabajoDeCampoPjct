import styles from './SearchModal.module.css';
import { Button } from '../Button/Button';
import { ButtonDeny } from '../ButtonDeny/ButtonDeny';
import Input from '../inputs/Input';

const SearchModal = ({ title = "Buscar", placeholder = "Ingrese su búsqueda", onSearch, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    onSearch(query);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="query"
            placeholder={placeholder}
            required
          />
          <div className={styles.buttons}>
            <ButtonDeny type="button" onClick={onCancel} text="Cancelar" />
            <Button type="submit" text="Enviar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
