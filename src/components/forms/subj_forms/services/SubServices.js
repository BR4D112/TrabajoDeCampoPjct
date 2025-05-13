// services/SubjectService.js
import { CREATE_SUBJECT, SEARCH_SUBJECT, UPDATE_SUBJECT } from '../../../../API/Endpoints.js';

// Buscar asignaturas
const fetchSubjects = async (token) => {
  try {
    const res = await fetch(SEARCH_SUBJECT, {
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status} al obtener las asignaturas`);
    }

    return await res.json(); // Asumiendo que la respuesta es un array de asignaturas
  } catch (err) {
    console.error('Error en fetchSubjects:', err);
    throw err;
  }
};

// Crear asignatura
const createSubject = async (subjectData, token) => {
  try {
    const res = await fetch(CREATE_SUBJECT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(subjectData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status} al crear la asignatura`);
    }

    return await res.json(); // Asumiendo que devuelve la asignatura creada
  } catch (err) {
    console.error('Error en createSubject:', err);
    throw err;
  }
};

// Actualizar asignatura
const updateSubject = async (id, updatedData, token) => {
  try {
    const res = await fetch(`${UPDATE_SUBJECT}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status} al actualizar la asignatura`);
    }

    return await res.json(); // Asumiendo que devuelve la asignatura actualizada
  } catch (err) {
    console.error('Error en updateSubject:', err);
    throw err;
  }
};

export const searchSubjects = async (term, token) => {
  const response = await fetch(`${SEARCH_SUBJECT}?name=${term}`, {  // Aquí se usa 'name' en lugar de 'search'
    headers: { Authorization: token }
  });
  if (!response.ok) throw new Error("No se pudieron obtener las materias");
  return response.json();
};

export { fetchSubjects, createSubject, updateSubject };