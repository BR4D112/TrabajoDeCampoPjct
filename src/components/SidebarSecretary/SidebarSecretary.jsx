import styles from './SidebarSecretary.module.css';

export function SidebarSecretary({ setSection }) {
  return (
    <div className={styles.sidebar}>
      <h2>Menú Secretaria</h2>
      <button onClick={() => setSection('gestionar-citas')}>Gestionar Citas</button>
      <button onClick={() => setSection('atender-solicitudes')}>Atender Solicitudes</button>
    </div>
  );
}
