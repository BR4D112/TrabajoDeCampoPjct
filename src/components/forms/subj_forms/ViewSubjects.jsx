import React, { useEffect, useState } from 'react';
import { SEARCH_SUBJECT } from '../../../API/Endpoints';

const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${SEARCH_SUBJECT}`, {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.error('Error al cargar materias:', err));
  }, []);

  return (
    <div>
      <h2>Listado de Materias</h2>
      <ul>
        {subjects.map(s => (
          <li key={s.id}><strong>{s.name}</strong> - Código: {s.code} - Semestre: {s.semester}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSubjects;
