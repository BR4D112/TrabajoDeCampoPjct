import styles from './SidebarAdmin.module.css';

export function SidebarAdmin({ setSection }) {
  return (
    <div className={styles.sidebar}>
      <h2>Menú Admin</h2>
      <button onClick={() => setSection('gestionar-usuarios')}>Gestionar Usuarios</button>
      <button onClick={() => setSection('configurar-sistema')}>Configurar Sistema</button>
    </div>
  );
}
