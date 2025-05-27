import React, { useEffect, useState } from 'react';
import { SEARCH_CLASSROOM } from '../../../API/Endpoints';

const ViewClassrooms = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(SEARCH_CLASSROOM, {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => setClassrooms(data))
      .catch(err => console.error('Error al cargar aulas:', err));
  }, []);

  return (
    <div>
      <h2>Listado de Aulas</h2>
      <ul>
        {classrooms.map(c => (
          <li key={c.id}><strong>{c.name}</strong> - Capacidad: {c.capacity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewClassrooms;