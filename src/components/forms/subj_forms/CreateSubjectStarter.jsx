import { useState } from "react";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";

const CreateSubjectStarter = ({ onContinue }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('2025-2');
  const [semester, setSemester] = useState('1');
  const [numSubjects, setNumSubjects] = useState('1');

  const handleContinue = () => {
    onContinue({
      academic_period_id: selectedPeriod,
      semester: parseInt(semester),
      subjectCount: parseInt(numSubjects),
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Configurar creación de materias</h2>
      <Select
        label="Periodo Académico"
        name="academic_period_id"
        value={selectedPeriod}
        options={[
          { value: "2025-2", label: "2025-2" },
          { value: "2026-1", label: "2026-1" }
        ]}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      />
      <Select
        label="Semestre"
        name="semester"
        value={semester}
        options={Array.from({ length: 10 }, (_, i) => ({
          value: (i + 1).toString(),
          label: `Semestre ${i + 1}`,
        }))}
        onChange={(e) => setSemester(e.target.value)}
      />
      <Select
        label="Cantidad de materias a crear"
        name="subjectCount"
        value={numSubjects}
        options={Array.from({ length: 10 }, (_, i) => ({
          value: (i + 1).toString(),
          label: `${i + 1} materias`,
        }))}
        onChange={(e) => setNumSubjects(e.target.value)}
      />
      <Button text="Continuar" onClick={handleContinue} />
    </div>
  );
};

export default CreateSubjectStarter;
