// components/forms/aula_forms/services/AulaService.js
import {CREATE_CLASSROOM, UPDATE_CLASSROOM, SEARCH_CLASSROOM} from "../../../API/Endpoints";

export const createAula = async (data, token) => {
  const res = await fetch(CREATE_CLASSROOM, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Error al crear aula: " + error);
  }

  return await res.json();
};

export const updateAula = async (id, data, token) => {
  const res = await fetch(`${UPDATE_CLASSROOM}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Error al actualizar aula: " + error);
  }

  return await res.json();
};

export const searchAulas = async (query, token) => {
  const res = await fetch(`${SEARCH_CLASSROOM}?name=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Error al buscar aulas: " + error);
  }

  return await res.json();
};
