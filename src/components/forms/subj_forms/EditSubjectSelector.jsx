import { useEffect, useState } from "react";
import { fetchSubjects } from "./services/SubServices";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";
import EditSubjectForm from "./EditSubjectForm";
import SubjectResultsList from "../group_forms/SubjectResultsList";

const EditSubjectSelector = ({ onBack }) => {
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleFetchSubjects = async () => {
    if (!semester) {
      alert("Selecciona un semestre primero.");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const allSubjects = await fetchSubjects(token);
      const filtered = allSubjects.filter(subj => subj.semester === parseInt(semester));
      setSubjects(filtered);
    } catch (error) {
      alert("Error al obtener materias.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedSubject) {
    return (
      <EditSubjectForm 
        initialData={selectedSubject} 
        onSubmitRequest={() => setSelectedSubject(null)} 
      />
    );
  }

  return (
    <div>
      
      <h2>Editar materia por semestre</h2>

      <Select
        label="Semestre"
        name="semester"
        value={semester}
        onChange={handleSemesterChange}
        options={Array.from({ length: 10 }, (_, i) => ({
          value: String(i + 1),
          label: `Semestre ${i + 1}`
        }))}
      />

      <Button text="Buscar" onClick={handleFetchSubjects} />

      {loading ? (
        <p>Cargando materias...</p>
      ) : (
        subjects.length > 0 && (
            <SubjectResultsList 
              subjects={subjects} 
                onSelect={setSelectedSubject} 
            />

        )
      )}
    </div>
  );
};

export default EditSubjectSelector;
