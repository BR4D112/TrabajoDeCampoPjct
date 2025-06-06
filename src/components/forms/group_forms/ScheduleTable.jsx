// ScheduleTable.jsx
import React from "react";

const hours = Array.from({ length: 13 }, (_, i) => `${7 + i}:00`);

const dayMap = {
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
};

const days = Object.values(dayMap);

const ScheduleTable = ({ sessions, teacherColor = "#000000" }) => {
  const getSessionAt = (day, hour) => {
    return sessions.find((s) => {
      if (!s.start_time || typeof s.start_time !== "string") return false;

      const timeParts = s.start_time.split(":");
      const start = parseInt(timeParts[0]);
      if (isNaN(start)) return false;

      const dur = s.duration_hours || 0;
      const end = start + dur;

      return dayMap[s.day_of_week] === day && hour >= start && hour < end;
    });
  };

  return (
    <table
      border="1"
      cellPadding={6}
      style={{ marginTop: "1rem", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th>Hora</th>
          {days.map((d) => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hours.map((h, idx) => {
          const hourNum = 7 + idx;
          return (
            <tr key={h}>
              <td>{h}</td>
              {days.map((d) => {
                const session = getSessionAt(d, hourNum);
                return (
                  <td key={d}>
                    {session ? (
                      <>
                        <strong>{session.subject_name}</strong>
                        <div>{session.group_code}</div>
                        <div style={{ fontSize: "0.9em", color: teacherColor }}>
                          👤 {session.teacher_name}
                        </div>
                        {/* <div style={{ fontSize: "0.9em", color: "#333" }}>
                          aula: {session.classroom_name || "Sin aula"}
                        </div> */}
                      </>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
