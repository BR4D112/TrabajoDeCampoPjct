import React, { useEffect, useState } from 'react';
import { SEARCH_DOCENTE } from '../../../API/Endpoints';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(SEARCH_DOCENTE, {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => console.error('Error al cargar docentes:', err));
  }, []);

  return (
    <div>
      <h2>Listado de Docentes</h2>
      <ul>
        {teachers.map(t => (
          <li key={t.id}><strong>{t.full_name}</strong> ({t.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTeachers;
