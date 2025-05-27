import React, { useState } from "react";
import SelectSemester from "./SelectSemester";
import { Button } from "../../Button/Button";
import { SEARCH_SUBJECT, SEARCH_SESSION, SEARCH_GROUP } from "../../../API/Endpoints.js";
import SubjectResultsListForEdit from "./SubjectResultsListForEdit";
import ScheduleTable from "./ScheduleTable";

const EditGroup = () => {
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setSubjects([]);
    setFilteredSessions([]);
  };

  const handleSearch = async () => {
    if (!semester) return;

    const token = localStorage.getItem("token");

    try {
      const subjectRes = await fetch(`${SEARCH_SUBJECT}?semester=${semester}`, {
        headers: { Authorization: token },
      });
      const subjectData = await subjectRes.json();
      setSubjects(subjectData);

      const groupRes = await fetch(SEARCH_GROUP, {
        headers: { Authorization: token },
      });
      const groups = await groupRes.json();

      const sessionRes = await fetch(SEARCH_SESSION, {
        headers: { Authorization: token },
      });
      const sessions = await sessionRes.json();

      const enriched = sessions
        .map((s) => {
          const group = groups.find((g) => g.id === s.group.id);
          if (!group || !group.subject) return null;

          return {
            ...s,
            subject_name: group.subject.name,
            semester: group.subject.semester,
            group_code: group.code,
            teacher_name: group.teacher?.full_name || "Sin docente",
          };
        })
        .filter((s) => s && s.semester === parseInt(semester));

      setFilteredSessions(enriched);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const sessionsByGroupNumber = filteredSessions.reduce((acc, session) => {
    const match = session.group_code.match(/G(\d+)$/i);
    if (!match) return acc;

    const groupNumber = match[1];
    if (!acc[groupNumber]) acc[groupNumber] = [];
    acc[groupNumber].push(session);

    return acc;
  }, {});

  return (
    <div>
      <h2>Editar grupos</h2>
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
          <SubjectResultsListForEdit subjects={subjects} />
        </div>
      )}

      {filteredSessions.length > 0 && (
        <div>
          <h3>Horario del semestre {semester}</h3>
          {Object.keys(sessionsByGroupNumber).map((groupNum) => (
            <div key={groupNum} style={{ marginBottom: "2rem" }}>
              <h4>Grupos número {groupNum}</h4>
              <ScheduleTable sessions={sessionsByGroupNumber[groupNum]} teacherColor="#FFFFFF" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditGroup;
