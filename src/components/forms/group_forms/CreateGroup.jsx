import React, { useState } from "react";
import SelectSemester from "./SelectSemester";
import { Button } from "../../Button/Button";
import { SEARCH_SUBJECT, SEARCH_SESSION, SEARCH_GROUP } from "../../../API/Endpoints.js";
import SubjectResultsList from "./SubjectResultsList";
import SelectGroupCountModal from "./SelectGroupCountModal";
import GroupFormsModal from "./GroupFormsModal";
import ScheduleTable from "./ScheduleTable";

const CrearGrupo = () => {
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [groupCount, setGroupCount] = useState(null);
  const [filteredSessions, setFilteredSessions] = useState([]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSearch = async () => {
    if (!semester) return;

    const token = localStorage.getItem("token");

    try {
      // Buscar materias
      const subjectRes = await fetch(`${SEARCH_SUBJECT}?semester=${semester}`, {
        headers: { Authorization: token },
      });
      if (!subjectRes.ok) throw new Error("Error al cargar materias");
      const subjectData = await subjectRes.json();
      setSubjects(subjectData);

      // Buscar grupos
      const groupRes = await fetch(SEARCH_GROUP, {
        headers: { Authorization: token },
      });
      const groups = await groupRes.json();

      // Buscar sesiones
      const sessionRes = await fetch(SEARCH_SESSION, {
        headers: { Authorization: token },
      });
      const sessions = await sessionRes.json();

      // Enriquecer sesiones con nombre de materia y semestre
      const enriched = sessions
        .map((s) => {
          const group = groups.find((g) => g.id === s.group.id);
          if (!group || !group.subject) return null;
          return {
            ...s,
            subject_name: group.subject.name,
            semester: group.subject.semester,
            group_code: group.code,
          };
        })
        .filter((s) => s && s.semester === parseInt(semester));

      setFilteredSessions(enriched);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSelectSubject = (subject) => setSelectedSubject(subject);
  const handleGroupCountSubmit = (count) => setGroupCount(count);
  const handleGroupsSubmit = (data) => {
    console.log("Grupos creados:", data);
    setSelectedSubject(null);
    setGroupCount(null);
  };
  const handleCancel = () => {
    setSelectedSubject(null);
    setGroupCount(null);
  };

  return (
    <div>
      <h2>Crear grupo</h2>
      <SelectSemester value={semester} onChange={handleSemesterChange} />
      <Button
        type="button"
        text="Buscar materias"
        onClick={handleSearch}
        disabled={!semester}
      />

      {subjects.length > 0 && (
        <div>
          <h3>Materias del semestre {semester}</h3>
          <SubjectResultsList subjects={subjects} onSelect={handleSelectSubject} />
        </div>
      )}

      {filteredSessions.length > 0 && (
        <div>
          <h3>Horario del semestre {semester}</h3>
          <ScheduleTable sessions={filteredSessions} />
        </div>
      )}

      {selectedSubject && !groupCount && (
        <SelectGroupCountModal
          subject={selectedSubject}
          onSubmit={handleGroupCountSubmit}
          onCancel={handleCancel}
        />
      )}

      {selectedSubject && groupCount && (
        <GroupFormsModal
          subject={selectedSubject}
          count={groupCount}
          onSubmit={handleGroupsSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CrearGrupo;
