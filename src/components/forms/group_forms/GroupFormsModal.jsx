import styles from '../../modal/SearchModal.module.css';
import { useEffect, useState } from 'react';
import { Button } from '../../Button/Button';
import { ButtonDeny } from '../../ButtonDeny/ButtonDeny';
import Input from '../../inputs/Input';
import Select from '../../selects/select';
import { SEARCH_DOCENTE, CREATE_GROUP, ASSIGN_TEACHER_URL, SEARCH_GROUP } from '../../../API/Endpoints'; 
import AssignTeacherModal from './AssignTeacherModal';

const GroupFormsModal = ({ subject, count, sessionCount, onSubmit, onCancel }) => {
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]); // grupos existentes
  const [isAssignTeacherModalOpen, setAssignTeacherModalOpen] = useState(false);
  const [newlyCreatedGroups, setNewlyCreatedGroups] = useState([]); // nue<vo>s grupos creados


  useEffect(() => {
    const token = localStorage.getItem('token');

    // Cargar docentes
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

    // Cargar grupos existentes por materia
    if (subject?.id) {
      const subjectId = Number(subject.id);
      fetch(`${SEARCH_GROUP}?subject_id=${subjectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('No se pudieron obtener los grupos');
          }
          return res.json();
        })
        .then((data) => {
          setGroups(data); // ✅ Guardar grupos existentes
        })
        .catch((err) => console.error('Error al cargar grupos:', err));
    }
  }, [subject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const existingCount = groups.length;

    const formData = Array.from({ length: count }).map((_, i) => {
      const groupNumber = existingCount + i + 1;
      return {
        code: `${subject.code}-G${groupNumber}`,
        number: groupNumber,
        capacity: parseInt(e.target[`capacity-${i}`].value),
        is_active: true,
        comments: e.target[`comments-${i}`].value,
        subject_id: Number(subject.id),
      };
    });

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

      // Guardamos solo los nuevos grupos creados
      setNewlyCreatedGroups(responses);
      setAssignTeacherModalOpen(true); // abrir modal de asignación
    } catch (error) {
      console.error('Error al crear grupos:', error);
      alert('Hubo un error al crear los grupos.');
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
              <h4>Grupo {groups.length + i + 1}</h4>
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
          groups={newlyCreatedGroups}
          sessionCount={sessionCount}
          onClose={() => setAssignTeacherModalOpen(false)}
          teachers={teachers}
          onAssign={assignTeacher}
        />

      )}
    </div>
  );
};

export default GroupFormsModal;
