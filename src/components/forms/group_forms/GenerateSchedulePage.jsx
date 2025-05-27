import React, { useEffect, useState } from "react";
import ScheduleExporter from "./ScheduleExporter";
import { SEARCH_SESSION, SEARCH_GROUP, SEARCH_CLASSROOM } from "../../../API/Endpoints";

const GenerateSchedulePage = () => {
  const [schedulesBySemester, setSchedulesBySemester] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No se encontró el token.");

        const [sessionsRes, groupsRes, classroomsRes] = await Promise.all([
          fetch(SEARCH_SESSION, { headers: { Authorization: token } }),
          fetch(SEARCH_GROUP, { headers: { Authorization: token } }),
          fetch(SEARCH_CLASSROOM, { headers: { Authorization: token } }),
        ]);

        if (!sessionsRes.ok || !groupsRes.ok || !classroomsRes.ok) {
          throw new Error("Fallo en la carga de datos.");
        }

        const sessions = await sessionsRes.json();
        const groups = await groupsRes.json();
        const classrooms = await classroomsRes.json();

        const groupMap = {};
        for (const group of groups) {
          groupMap[group.id] = group;
        }

        const classroomMap = {};
        for (const classroom of classrooms) {
          classroomMap[classroom.id] = classroom;
        }

        const semesterMap = {};

        for (const session of sessions) {
          const groupId = session.group?.id;
          const group = groupMap[groupId];
          const classroom = classroomMap[session.classroom_id];

          if (!group?.subject?.semester) continue;

          const semester = String(group.subject.semester);
          if (!semesterMap[semester]) semesterMap[semester] = [];

          semesterMap[semester].push({
            ...session,
            subject_name: group.subject.name,
            group_code: group.code,
            teacher_name: group.teacher?.full_name || "Sin docente",
            classroom_name: classroom?.name || "Sin aula",
          });
        }

        setSchedulesBySemester(semesterMap);
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div>Cargando horarios...</div>;
  if (!schedulesBySemester || Object.keys(schedulesBySemester).length === 0)
    return <div>No hay sesiones para mostrar.</div>;

  return (
    <div>
      <h1>Generar PDF de todos los semestres</h1>
      <ScheduleExporter schedulesBySemester={schedulesBySemester} />
    </div>
  );
};

export default GenerateSchedulePage;
