// services/AcademicPeriodService.js
import { SEARCH_ACADEMIC_PERIOD } from '../../../../API/Endpoints.js';

const fetchAcademicPeriods = async (token) => {
  try {
    const res = await fetch(SEARCH_ACADEMIC_PERIOD, {
      headers: {
        'Authorization': `${token}`, // Agregar el token si es necesario
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status} al obtener los periodos académicos`);
    }

    return await res.json(); // Asumiendo que la respuesta es un array de periodos
  } catch (err) {
    console.error('Error en fetchAcademicPeriods:', err);
    throw err;
  }
};

export { fetchAcademicPeriods };
