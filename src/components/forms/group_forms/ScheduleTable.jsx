import React from "react";

const hours = Array.from({ length: 13 }, (_, i) => `${7 + i}:00`);
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ScheduleTable = ({ sessions }) => {
  const getSessionAt = (day, hour) => {
    return sessions.find((s) => {
      const start = parseInt(s.start_time.split(":")[0]);
      const dur = s.duration_hours;
      const end = start + dur;
      return s.day_of_week === day && hour >= start && hour < end;
    });
  };

  return (
    <table border="1" cellPadding={6} style={{ marginTop: "1rem", borderCollapse: "collapse" }}>
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
                      </>
                    ) : (
                      ""
                    )}
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
