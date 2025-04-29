import styles from './SidebarDirector.module.css';

export function Sidebar({ setSection }) {
  return (
    <div className={styles.sidebar}>
      <h2>Menú Director</h2>
      <button onClick={() => setSection('crear-docente')}>Crear Docente</button>
      <button onClick={() => setSection('crear-aula')}>Crear Aula</button>
      {/* Agrega más botones aquí */}
    </div>
  );
}
