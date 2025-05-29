import React, { useEffect, useState } from 'react';
import styles from '../../modal/SearchModal.module.css';
import Select from '../../selects/select';
import Input from '../../inputs/Input';
import { Button } from '../../Button/Button';
import { ButtonDeny } from '../../ButtonDeny/ButtonDeny';
import {
  SEARCH_DOCENTE,
  SEARCH_SESSION,
  SEARCH_CLASSROOM,
  UPDATE_GROUP,
  UPDATE_SESSION,
  ASSIGN_TEACHER_URL,
} from '../../../API/Endpoints';

const EditGroupModal = ({ group, onClose }) => {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({
    capacity: group.capacity,
    teacherId: group.teacher?.id || "",
  });

  const daysOfWeek = [
    { value: 'Monday', label: 'Lunes' },
    { value: 'Tuesday', label: 'Martes' },
    { value: 'Wednesday', label: 'Miércoles' },
    { value: 'Thursday', label: 'Jueves' },
    { value: 'Friday', label: 'Viernes' },
  ];

  const hours = Array.from({ length: 14 }, (_, i) => {
    const hour = 7 + i;
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(SEARCH_DOCENTE, { headers: { Authorization: token } })
      .then(res => res.json())
      .then(data =>
        setTeachers(data.map(d => ({ label: d.full_name, value: d.id.toString() })))
      )
      .catch(console.error);

    fetch(SEARCH_CLASSROOM, { headers: { Authorization: token } })
      .then(res => res.json())
      .then(data =>
        setClassrooms(data.map(c => ({ label: c.name, value: c.id.toString() })))
      )
      .catch(console.error);

    fetch(`${SEARCH_SESSION}?group_id=${group.id}`, { headers: { Authorization: token } })
      .then(res => res.json())
      .then(data => {
        const withEndTimes = data.map(s => {
          const startHour = parseInt(s.start_time.split(":")[0]);
          const endHour = startHour + (s.duration_hours || 1);
          return {
            ...s,
            end_time: `${endHour}:00`,
          };
        });
        setSessions(withEndTimes);
      })
      .catch(console.error);
  }, [group.id]);

  const handleSessionChange = (index, field, value) => {
    const updated = [...sessions];
    updated[index] = { ...updated[index], [field]: value };
    setSessions(updated);
  };

  const calculateDuration = (start, end) => {
    const [startHour] = start.split(":").map(Number);
    const [endHour] = end.split(":").map(Number);
    return Math.max(endHour - startHour, 1);
  };

const handleSubmit = async () => {
  const token = localStorage.getItem('token');

  try {
    // 🟢 Actualizar capacidad del grupo
    const groupRes = await fetch(`${UPDATE_GROUP}${group.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        capacity: parseInt(form.capacity),
      }),
    });

    const groupData = await groupRes.json();
    console.log('✅ Grupo actualizado:', groupData);

    // 🟢 Asignar docente usando el endpoint especial
    const teacherRes = await fetch(`${ASSIGN_TEACHER_URL}${group.id}/assign-teacher`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teacher_id: parseInt(form.teacherId),
      }),
    });

    const teacherData = await teacherRes.json();
    console.log('✅ Docente asignado:', teacherData);

    // 🟢 Actualizar sesiones
    await Promise.all(
      sessions.map(session => {
        const duration = calculateDuration(session.start_time, session.end_time);

        return fetch(`${UPDATE_SESSION}/${session.id}`, {
          method: 'PATCH',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            day_of_week: session.day_of_week,
            start_time: session.start_time,
            duration_hours: duration,
            classroom_id: parseInt(session.classroom_id),
          }),
        });
      })
    );

    alert('Grupo actualizado correctamente');
    onClose();
  } catch (error) {
    console.error('❌ Error actualizando grupo o docente:', error);
    alert('Error al actualizar grupo');
  }
};


  return (
    <div className={styles.overlay}>
      <div className={styles.modal} style={{ width: '650px' }}>
        <h2>Editar grupo: {group.code}</h2>

        <Input
          type="number"
          placeholder="Capacidad"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />

        <Select
          name="teacher"
          label="Docente"
          value={form.teacherId}
          options={teachers}
          onChange={(e) => {
            console.log("🟢 Cambio de docente:", e.target.value);
            setForm({ ...form, teacherId: e.target.value });
          }}
        />

        <h3>Sesiones del grupo</h3>
        {sessions.map((s, idx) => (
          <div
            key={s.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          >
            <p><strong>Sesión {idx + 1}</strong></p>

            <Select
              name={`day-${idx}`}
              label="Día"
              value={s.day_of_week}
              options={daysOfWeek}
              onChange={(e) => handleSessionChange(idx, "day_of_week", e.target.value)}
            />

            <Select
              name={`start-${idx}`}
              label="Hora de inicio"
              value={s.start_time}
              options={hours}
              onChange={(e) => handleSessionChange(idx, "start_time", e.target.value)}
            />

            <Select
              name={`end-${idx}`}
              label="Hora de fin"
              value={s.end_time}
              options={hours.filter(h =>
                parseInt(h.value.split(":")[0]) > parseInt(s.start_time?.split(":")[0] || 0)
              )}
              onChange={(e) => handleSessionChange(idx, "end_time", e.target.value)}
            />

            <Select
              name={`classroom-${idx}`}
              label="Aula"
              value={s.classroom_id}
              options={classrooms}
              onChange={(e) => handleSessionChange(idx, "classroom_id", e.target.value)}
            />
          </div>
        ))}

        <div className={styles.buttons}>
          <ButtonDeny type="button" text="Cancelar" onClick={onClose} />
          <Button type="button" text="Guardar Cambios" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditGroupModal;
