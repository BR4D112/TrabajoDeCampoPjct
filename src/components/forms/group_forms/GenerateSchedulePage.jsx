import React, { useEffect, useState } from "react";
import ScheduleExporter from "./ScheduleExporter";
import { SEARCH_SESSION, SEARCH_GROUP } from "../../../API/Endpoints";

const GenerateSchedulePage = () => {
  const [schedulesBySemester, setSchedulesBySemester] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionsAndGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No se encontró el token.");

        const [sessionsRes, groupsRes] = await Promise.all([
          fetch(SEARCH_SESSION, {
            headers: { Authorization: token },
          }),
          fetch(SEARCH_GROUP, {
            headers: { Authorization: token },
          }),
        ]);

        if (!sessionsRes.ok || !groupsRes.ok) {
          throw new Error("Fallo en la carga de datos.");
        }

        const sessions = await sessionsRes.json();
        const groups = await groupsRes.json();

        const groupMap = {};
        for (const group of groups) {
          groupMap[group.id] = group;
        }

        const semesterMap = {};

        for (const session of sessions) {
          const groupId = session.group?.id;
          const group = groupMap[groupId];

          if (!group?.subject?.semester) continue;

          const semester = String(group.subject.semester);
          if (!semesterMap[semester]) semesterMap[semester] = [];

          semesterMap[semester].push({
            ...session,
            subject_name: group.subject.name,
            group_code: group.code,
          });

          console.log(`✅ Incluyendo sesión en semestre ${semester}`);
        }

        console.log("📊 Semestres detectados:", Object.keys(semesterMap));
        setSchedulesBySemester(semesterMap);
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionsAndGroups();
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