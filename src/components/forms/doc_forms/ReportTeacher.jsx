import React, { useEffect, useState } from 'react';
import styles from './ReportTeacher.module.css';
import Select from '../../selects/select';
import { Button } from '../../Button/Button';
import { SEARCH_DOCENTE, CREATE_REPORT, CREATE_REPORTS_ALL } from '../../../API/Endpoints';

const ReportTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(SEARCH_DOCENTE, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) =>
        setTeachers(
          data.map((doc) => ({
            label: doc.full_name,
            value: doc.id,
          }))
        )
      )
      .catch((err) => console.error("Error al cargar docentes:", err));
  }, []);

  const handleSendToOne = async () => {
    if (!selectedTeacher) return alert("Selecciona un docente");

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${CREATE_REPORT}/${selectedTeacher}`, {
        method: "POST",
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error("Error al enviar reporte");

      alert("Reporte enviado al docente");
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo enviar el reporte");
    }
  };

  const handleSendToAll = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(CREATE_REPORTS_ALL, {
        method: "POST",
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error("Error al enviar reportes");

      alert("Reportes enviados a todos los docentes");
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo enviar a todos");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Notificar a un Docente</h2>

      <div className={styles.selectWrapper}>
        <Select
          label="Selecciona un docente"
          name="teacher"
          options={teachers}
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button text="Enviar a docente" type="button" onClick={handleSendToOne} />
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2 className={styles.heading}>Notificar a todos los Docentes</h2>

      <div className={styles.buttonWrapper}>
        <Button text="Enviar a todos" type="button" onClick={handleSendToAll} />
      </div>
    </div>
  );
};

export default ReportTeacher;
