// services/TeacherService.js
import { CREATE_DOCENTE, SEARCH_DOCENTE, UPDATE_DOCENTE } from '../../../../API/Endpoints.js';

const createDocente = async (docenteData, token) => {
  try {
    const res = await fetch(CREATE_DOCENTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}` // usa 'Bearer' si tu backend lo requiere
      },
      body: JSON.stringify(docenteData)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status} al crear el docente`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error en createDocente:', err);
    throw err;
  }
};

const searchDocentes = async (query, token) => {
  try {
    // Si la búsqueda está vacía o es "todos", omite el parámetro name
    const url = (!query || query.trim().toLowerCase() === 'todos')
      ? `${SEARCH_DOCENTE}`
      : `${SEARCH_DOCENTE}?name=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      headers: {
        'Authorization': `${token}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status} al buscar docentes`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error en searchDocentes:', err);
    throw err;
  }
};


const updateDocente = async (id, docenteData, token) => {
  try {
    const res = await fetch(`${UPDATE_DOCENTE}${id}`, {
      method: 'PATCH', // <-- Cambiado de PUT a PATCH según tu backend
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(docenteData)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status} al actualizar el docente`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error en updateDocente:', err);
    throw err;
  }
};

export { createDocente, searchDocentes, updateDocente };
