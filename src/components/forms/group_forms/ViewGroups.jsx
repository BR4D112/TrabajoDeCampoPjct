import React, { useEffect, useState } from 'react';
import { SEARCH_GROUP } from '../../../API/Endpoints';

const ViewGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(SEARCH_GROUP, {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error('Error al cargar grupos:', err));
  }, []);

  return (
    <div>
      <h2>Listado de Grupos</h2>
      <ul>
        {groups.map(g => (
          <li key={g.id}><strong>{g.code}</strong> - Materia: {g.subject?.name || 'N/A'} - Docente: {g.teacher?.full_name || 'Sin asignar'}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewGroups;