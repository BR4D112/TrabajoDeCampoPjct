// ... imports
import { useEffect, useState } from 'react';
import styles from '../../modal/SearchModal.module.css';
import { Button } from '../../Button/Button';
import { ButtonDeny } from '../../ButtonDeny/ButtonDeny';
import Select from '../../selects/select';
import { CREATE_SESSION, SEARCH_DOCENTE, SEARCH_SESSION, SEARCH_CLASSROOM, ASSIGN_TEACHER_URL, UPDATE_SESSION } from '../../../API/Endpoints';


const AssignTeacherModal = ({ groups, sessionCount, onClose }) => {
  const [teachers, setTeachers] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [sessionsByGroup, setSessionsByGroup] = useState({});
  const [classrooms, setClassrooms] = useState([]);
  const [sessionForms, setSessionForms] = useState({});

  const daysOfWeek = [
    { value: 'monday', label: 'Lunes' },
    { value: 'tuesday', label: 'Martes' },
    { value: 'wednesday', label: 'Miércoles' },
    { value: 'thursday', label: 'Jueves' },
    { value: 'friday', label: 'Viernes' },
  ];

  const hours = Array.from({ length: 14 }, (_, i) => {
    const hour = 7 + i;
    const label = `${hour}:00`;
    return { value: label, label };
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(SEARCH_DOCENTE, {
      headers: { Authorization: `${token}` },
    })
      .then(res => res.json())
      .then(data =>
        setTeachers(data.map(docente => ({
          value: docente.id,
          label: docente.full_name,
        })))
      )
      .catch(err => console.error('Error al cargar docentes:', err));

    fetch(SEARCH_CLASSROOM, {
      headers: { Authorization: `${token}` },
    })
      .then(res => res.json())
      .then(data =>
        setClassrooms(data.map(aula => ({
          value: aula.id,
          label: aula.name,
        })))
      )
      .catch(err => console.error('Error al cargar aulas:', err));
  }, []);

  useEffect(() => {
    const newForms = {};
    groups.forEach(group => {
      newForms[group.id] = Array.from({ length: sessionCount }).map(() => ({
        day: '',
        start_time: '',
        end_time: '',
        classroom_id: '',
      }));
    });
    setSessionForms(newForms);
  }, [groups, sessionCount]);


  const handleSelectChange = (groupId, teacherId) => {
    setAssignments(prev => ({ ...prev, [groupId]: teacherId }));
  };

  const handleSessionChange = (groupId, sessionIndex, field, value) => {
    setSessionForms(prev => {
      const updatedSessions = [...prev[groupId]];
      updatedSessions[sessionIndex] = {
        ...updatedSessions[sessionIndex],
        [field]: value,
      };
      return { ...prev, [groupId]: updatedSessions };
    });
  };

  const formatHour = (hourStr) => {
    const [hour, minute] = hourStr.split(':');
    const paddedHour = hour.padStart(2, '0');
    return `${paddedHour}:${minute}:00`;
  };

  const calculateDuration = (start, end) => {
    const [startHour] = start.split(":").map(Number);
    const [endHour] = end.split(":").map(Number);

    if (endHour <= startHour) {
      throw new Error("La hora de fin debe ser mayor que la hora de inicio");
    }

    return endHour - startHour;
  };



  const handleAssignTeachers = async () => {
    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        groups.map(async (group) => {
          // 1. Asignar docente
          await fetch(`${ASSIGN_TEACHER_URL}${group.id}/assign-teacher`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            body: JSON.stringify({ teacher_id: assignments[group.id] }),
          });

          // 2. Actualizar sesiones del grupo
          const sessions = sessionsByGroup[group.id];
          const updatedForms = sessionForms[group.id];

          await Promise.all(
            sessionForms[group.id].map((form) => {
              const payload = {
                group_id: group.id,
                day_of_week: form.day.charAt(0).toUpperCase() + form.day.slice(1),
                start_time: formatHour(form.start_time),
                duration_hours: calculateDuration(form.start_time, form.end_time),
                classroom_id: parseInt(form.classroom_id),
              };

              return fetch(CREATE_SESSION, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`,
                },
                body: JSON.stringify(payload),
              });
            })
          );

          
        })
      );

      alert('Docentes y sesiones actualizados exitosamente.');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al asignar docente o actualizar sesiones.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Asignar docentes a los grupos</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAssignTeachers();
          }}
        >
          {groups.map((group) => (
            <div key={group.id} style={{ marginBottom: '1rem' }}>
              <h4>{group.code}</h4>
              <Select
                name={`teacher-${group.id}`}
                label="Docente"
                options={teachers}
                onChange={(e) => handleSelectChange(group.id, parseInt(e.target.value))}
              />
            {sessionForms[group.id] &&
              sessionForms[group.id].map((session, index) => (
                <div key={index} style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
                  <h5>Sesión {index + 1}</h5>

                  <Select
                    name={`day-${group.id}-${index}`}
                    label="Día de la semana"
                    options={daysOfWeek}
                    value={session.day}
                    onChange={(e) => handleSessionChange(group.id, index, 'day', e.target.value)}
                  />

                  <Select
                    name={`start-${group.id}-${index}`}
                    label="Hora de inicio"
                    options={hours}
                    value={session.start_time}
                    onChange={(e) => handleSessionChange(group.id, index, 'start_time', e.target.value)}
                  />

                  <Select
                    name={`end-${group.id}-${index}`}
                    label="Hora de fin"
                    options={
                      hours.filter(
                        (h) => parseInt(h.value.split(":")[0]) > parseInt(session.start_time?.split(":")[0])
                      )
                    }
                    value={session.end_time}
                    onChange={(e) => handleSessionChange(group.id, index, 'end_time', e.target.value)}
                  />


                  <Select
                    name={`classroom-${group.id}-${index}`}
                    label="Aula"
                    options={classrooms}
                    value={session.classroom_id}
                    onChange={(e) => handleSessionChange(group.id, index, 'classroom_id', e.target.value)}
                  />
                </div>
            ))}
            </div>
          ))}
          <div className={styles.buttons}>
            <ButtonDeny type="button" onClick={onClose} text="Cancelar" />
            <Button type="submit" text="Guardar asignaciones" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTeacherModal;
