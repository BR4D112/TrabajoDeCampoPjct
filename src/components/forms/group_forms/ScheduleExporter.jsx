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
    let yOffset = margin;

    const semesters = selectedSemester === "all"
      ? Object.keys(schedulesBySemester)
      : [selectedSemester];

    for (let i = 0; i < semesters.length; i++) {
      const semester = semesters[i];
      const el = containerRef.current.querySelector(`#semester-${semester}`);
      if (!el) continue;

      await new Promise((resolve) => setTimeout(resolve, 300)); // tiempo para asegurar render

      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i !== 0) {
        pdf.addPage();
        yOffset = margin;
      }

      pdf.text(`Semestre ${semester}`, margin, margin - 10);
      pdf.addImage(imgData, "PNG", margin, yOffset, pdfWidth, pdfHeight);
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

      {/* Vista previa */}
      <div ref={containerRef} style={{ color: "black" }}>
        {(selectedSemester === "all"
          ? Object.keys(schedulesBySemester)
          : [selectedSemester]
        ).map((semester) => (
          <div
            key={semester}
            id={`semester-${semester}`}
            className="schedule-semester"
            style={{
              marginBottom: "2rem",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <h2>Semestre {semester}</h2>
            <ScheduleTable sessions={schedulesBySemester[semester]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleExporter;
