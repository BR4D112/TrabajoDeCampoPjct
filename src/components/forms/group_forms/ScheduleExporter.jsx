import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ScheduleTable from "./ScheduleTable";
import { Button } from "../../Button/Button";
import SelectII from "../../selects/SelectII";

const ScheduleExporter = ({ schedulesBySemester }) => {
  const containerRef = useRef();
  const [selectedSemester, setSelectedSemester] = useState("all");

  const exportToPDF = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4");
    const margin = 40;

    const semesters = selectedSemester === "all"
      ? Object.keys(schedulesBySemester)
      : [selectedSemester];

    for (let i = 0; i < semesters.length; i++) {
      const semester = semesters[i];
      const sessions = schedulesBySemester[semester];

      // Agrupar por número de grupo extraído del group_code
      const groupedByNumber = sessions.reduce((acc, session) => {
        const match = session.group_code.match(/G(\d+)$/i);
        if (!match) return acc;
        const groupNum = match[1]; // e.g., "1"
        if (!acc[groupNum]) acc[groupNum] = [];
        acc[groupNum].push(session);
        return acc;
      }, {});

      const groupNumbers = Object.keys(groupedByNumber);

      for (let j = 0; j < groupNumbers.length; j++) {
        const groupNum = groupNumbers[j];
        const elementId = `semester-${semester}-group-${groupNum}`;
        const el = containerRef.current.querySelector(`#${elementId}`);
        if (!el) continue;

        await new Promise((resolve) => setTimeout(resolve, 300)); // asegurar render

        const canvas = await html2canvas(el, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i !== 0 || j !== 0) {
          pdf.addPage();
        }

        pdf.text(`Semestre ${semester} - Grupo ${groupNum}`, margin, margin - 10);
        pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
      }
    }

    const filename =
      selectedSemester === "all"
        ? "horarios_por_semestre.pdf"
        : `horario_semestre_${selectedSemester}.pdf`;

    pdf.save(filename);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <SelectII
          label="Filtrar por semestre"
          name="semester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          options={[
            { label: "Todos los semestres", value: "all" },
            ...Object.keys(schedulesBySemester).map((sem) => ({
              label: `Semestre ${sem}`,
              value: sem,
            })),
          ]}
        />
        <Button
          type="button"
          text="Exportar PDF 📕"
          onClick={exportToPDF}
        />
      </div>

      {/* Vista previa agrupada por número de grupo */}
      <div ref={containerRef} style={{ color: "black" }}>
        {(selectedSemester === "all"
          ? Object.keys(schedulesBySemester)
          : [selectedSemester]
        ).map((semester) => {
          const sessions = schedulesBySemester[semester];

          const groupedByNumber = sessions.reduce((acc, s) => {
            const match = s.group_code.match(/G(\d+)$/i);
            if (!match) return acc;
            const groupNum = match[1];
            if (!acc[groupNum]) acc[groupNum] = [];
            acc[groupNum].push(s);
            return acc;
          }, {});

          return Object.keys(groupedByNumber).map((groupNum) => (
            <div
              key={`${semester}-group-${groupNum}`}
              id={`semester-${semester}-group-${groupNum}`}
              style={{
                marginBottom: "2rem",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <h2>Semestre {semester} - Grupos número {groupNum}</h2>
              <ScheduleTable sessions={groupedByNumber[groupNum]} />
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default ScheduleExporter;
