import styles from './Sidebar.module.css';
import addDocenteIcon from '../../assets/add_user_or_doc.png';
import editDocenteIcon from '../../assets/edit_user_or_doc.png';
import addSubjectIcon from '../../assets/add_subject.png';
import editSubjectIcon from '../../assets/edit_subject.png';
import addAulaIcon from '../../assets/add.png';
import editAulaIcon from '../../assets/edit.png';

export function Sidebar({ first_name, setSection }) {
  return (
    <div className={styles.sidebar}>
      {first_name === 'director' && (
        <>
          <h2>Docentes</h2>
          <button className={styles['sidebar-btn']} onClick={() => {
            console.log('Sección seleccionada: crear-docente');
            setSection('crear-docente')}}>
            <img src={addDocenteIcon} alt="Crear Docente" className={styles.icon} />
            Crear Docente
          </button>
          <button className={styles['sidebar-btn']} onClick={() => setSection('editar-docente')}>
            <img src={editDocenteIcon} alt="Editar Docente" className={styles.icon} />
            Editar Docente
          </button>
          <h2>Materias</h2>
          <button className={styles['sidebar-btn']} onClick={() => setSection('crear-materia')}>
            <img src={addSubjectIcon} alt="Crear Materia" className={styles.icon} />
            Crear Materia
          </button>
          <button className={styles['sidebar-btn']} onClick={() => setSection('editar-materia')}>
            <img src={editSubjectIcon} alt="Editar Materia" className={styles.icon} />
            Editar Materia
          </button>
          <h2>Grupos</h2>
          <button className={styles['sidebar-btn']} onClick={() => setSection('crear-grupo')}>
            <img src={addAulaIcon} alt="Crear Grupo" className={styles.icon} />
            Crear Grupos
          </button>
          <button className={styles['sidebar-btn']} onClick={() => setSection('editar-grupo')}>
            <img src={editAulaIcon} alt="Editar Grupo" className={styles.icon} />
            Editar Grupos
          </button>
          <h2>Aulas</h2>
          <button className={styles['sidebar-btn']} onClick={() => setSection('crear-aula')}>
            <img src={addAulaIcon} alt="Crear Aula" className={styles.icon} />
            Crear Aula
          </button>
          <button className={styles['sidebar-btn']} onClick={() => setSection('editar-aula')}>
            <img src={editAulaIcon} alt="Editar Aula" className={styles.icon} />
            Editar Aula
          </button>
          <h2>Reportes</h2>
          <button className={styles['sidebar-btn']} onClick={() => setSection('ver-horario')}>
            <img src={addAulaIcon} alt="Crear Reporte de Semestres" className={styles.icon} />
            Crear Reporte de Semestres
          </button>
          {/* <button className={styles['sidebar-btn']} onClick={() => setSection('crear-aula')}>
            <img src={addAulaIcon} alt="Crear Aula" className={styles.icon} />
            Crear Aula
          </button> */}

          
        </>
      )}

      {first_name === 'admin' && (
        <>
          <button onClick={() => setSection('admin-opcion')}>Admin Option</button>
        </>
      )}

      {first_name === 'secretary' && (
        <>
          <button onClick={() => setSection('ver-docente')}>Ver Docentes</button>
        </>
      )}
    </div>
  );
}