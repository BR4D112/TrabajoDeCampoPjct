import styles from '../../modal/SearchModal.module.css';
import { useEffect, useState } from 'react';
import { Button } from '../../Button/Button';
import { ButtonDeny } from '../../ButtonDeny/ButtonDeny';
import Input from '../../inputs/Input';
import Select from '../../selects/select';
import { SEARCH_DOCENTE, CREATE_GROUP, ASSIGN_TEACHER_URL } from '../../../API/Endpoints'; 
import AssignTeacherModal from './AssignTeacherModal';

const GroupFormsModal = ({ subject, count, onSubmit, onCancel }) => {
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isAssignTeacherModalOpen, setAssignTeacherModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(SEARCH_DOCENTE, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setTeachers(
          data.map((docente) => ({
            value: docente.id,
            label: docente.full_name,
          }))
        )
      )
      .catch((err) => console.error('Error al cargar docentes:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = Array.from({ length: count }).map((_, i) => ({
      code: `${subject.code}-G${i + 1}`,
      number: i + 1,
      capacity: parseInt(e.target[`capacity-${i}`].value),
      is_active: true,
      comments: e.target[`comments-${i}`].value,
      subject_id: subject.id,
    }));

    try {
      const responses = await Promise.all(
        formData.map((group) =>
          fetch(CREATE_GROUP, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            body: JSON.stringify(group),
          }).then((res) => {
            if (!res.ok) {
              throw new Error(`Error en grupo ${group.code}`);
            }
            return res.json();
          })
        )
      );

      console.log('Todos los grupos fueron creados:', responses);
      alert('Grupos creados exitosamente.');
      setGroups(responses); // Guardamos los grupos para la asignación posterior
      setAssignTeacherModalOpen(true); // Abrimos el modal de asignación de docentes
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear uno o más grupos.');
    }
  };

  const assignTeacher = async (groupId, teacherId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${ASSIGN_TEACHER_URL}${groupId}/assign-teacher`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ teacher_id: teacherId }),
      });

      if (!response.ok) {
        throw new Error('Error al asignar el docente al grupo');
      }

      console.log('Docente asignado exitosamente.');
      alert('Docente asignado exitosamente.');
    } catch (error) {
      console.error('Error al asignar docente:', error);
      alert('Hubo un error al asignar el docente.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <h2>Detalles de los {count} grupos para {subject.name}</h2>
        <form onSubmit={handleSubmit}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <h4>Grupo {i + 1}</h4>
              <Input name={`capacity-${i}`} type="number" placeholder="Cupo máximo" required />
              <Input name={`comments-${i}`} placeholder="Comentarios" />
            </div>
          ))}
          <div className={styles.buttons}>
            <ButtonDeny type="button" onClick={onCancel} text="Cancelar" />
            <Button type="submit" text="Guardar grupos" />
          </div>
        </form>
      </div>
      {isAssignTeacherModalOpen && (
        <AssignTeacherModal
          groups={groups} 
          onClose={() => setAssignTeacherModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default GroupFormsModal;
