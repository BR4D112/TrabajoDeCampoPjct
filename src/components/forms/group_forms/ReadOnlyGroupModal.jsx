import React, { useEffect, useState } from 'react';
import styles from '../../modal/SearchModal.module.css';
import { ButtonDeny } from '../../ButtonDeny/ButtonDeny';
import { SEARCH_SESSION, SEARCH_CLASSROOM, SEARCH_DOCENTE } from '../../../API/Endpoints';

const ReadOnlyGroupModal = ({ group, onClose }) => {
  const [sessions, setSessions] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [teacherName, setTeacherName] = useState(group.teacher?.full_name || 'Sin docente');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${SEARCH_SESSION}?group_id=${group.id}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then(setSessions)
      .catch(console.error);

    fetch(SEARCH_CLASSROOM, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setClassrooms(data.map((c) => ({ id: c.id, name: c.name }))))
      .catch(console.error);

    if (!group.teacher?.full_name && group.teacher?.id) {
      fetch(`${SEARCH_DOCENTE}?id=${group.teacher.id}`, {
        headers: { Authorization: token },
      })
        .then((res) => res.json())
        .then((data) => setTeacherName(data[0]?.full_name || 'Sin docente'))
        .catch(console.error);
    }
  }, [group]);

  const getClassroomName = (id) => {
    return classrooms.find((c) => c.id === id)?.name || 'No asignada';
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} style={{ width: '600px' }}>
        <h2>Grupo: {group.code}</h2>
        <p><strong>Docente:</strong> {teacherName}</p>
        <p><strong>Capacidad:</strong> {group.capacity}</p>

        <h3>Sesiones</h3>
        {sessions.map((s, idx) => (
          <div
            key={s.id}
            style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
          >
            <p><strong>Sesión {idx + 1}</strong></p>
            <p>Día: {s.day_of_week}</p>
            <p>Inicio: {s.start_time}</p>
            <p>Duración: {s.duration_hours} hora(s)</p>
            <p>Aula: {getClassroomName(s.classroom_id)}</p>
          </div>
        ))}

        <div className={styles.buttons}>
          <ButtonDeny type="button" text="Cerrar" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyGroupModal;
