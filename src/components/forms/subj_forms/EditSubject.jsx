import { useState } from "react";
import Input from "../../inputs/Input";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";
import { UPDATE_SUBJECT } from "../../../API/Endpoints";

const EditarMateria = () => {
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchSubjects = async () => {
    if (!semester) {
      alert("Selecciona un semestre");
      return;
    }

    try {
      const res = await fetch(`${UPDATE_SUBJECT}search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ semester: parseInt(semester) }),
      });

      if (!res.ok) throw new Error("No se pudieron cargar las materias");

      const data = await res.json();
      setSubjects(data);
      setSelectedSubject(null); // limpiar selección anterior
    } catch (error) {
      console.error("Error al buscar materias:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${UPDATE_SUBJECT}${selectedSubject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ...selectedSubject,
          credits: parseInt(selectedSubject.credits),
          weekly_hours: parseInt(selectedSubject.weekly_hours),
          is_active: selectedSubject.is_active === "true",
        }),
      });

      if (!res.ok) throw new Error("Error actualizando la materia");

      alert("Materia actualizada exitosamente");
      fetchSubjects(); // refrescar la lista
      setSelectedSubject(null);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al actualizar.");
    }
  };

  const handleChange = (field, value) => {
    setSelectedSubject((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2>Editar Materia</h2>

      <Select
        label="Semestre"
        name="semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        options={Array.from({ length: 10 }, (_, i) => ({
          value: String(i + 1),
          label: `Semestre ${i + 1}`,
        }))}
      />
      <Button text="Buscar materias" onClick={fetchSubjects} disabled={!semester} />

      {!selectedSubject && subjects.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Materias encontradas:</h3>
          <ul>
            {subjects.map((subject) => (
              <li key={subject.id} style={{ marginBottom: "0.5rem" }}>
                {subject.name} ({subject.code}){" "}
                <Button text="Editar" onClick={() => setSelectedSubject(subject)} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedSubject && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h3>Editando: {selectedSubject.name}</h3>

<p>Código</p>
<input
  name="code"
  placeholder="Código"
  value={selectedSubject.code}
  onChange={(e) => handleChange("code", e.target.value)}
/>

          <Input
            name="name"
            placeholder="Nombre"
            value={selectedSubject.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            name="credits"
            type="number"
            placeholder="Créditos"
            value={selectedSubject.credits}
            onChange={(e) => handleChange("credits", e.target.value)}
          />
          <Input
            name="weekly_hours"
            type="number"
            placeholder="Horas semanales"
            value={selectedSubject.weekly_hours}
            onChange={(e) => handleChange("weekly_hours", e.target.value)}
          />
          <Select
            label="¿Activa?"
            name="is_active"
            value={String(selectedSubject.is_active)}
            onChange={(e) => handleChange("is_active", e.target.value)}
            options={[
              { label: "Sí", value: "true" },
              { label: "No", value: "false" },
            ]}
          />
          <div style={{ marginTop: "1rem" }}>
            <Button text="Guardar cambios" onClick={handleUpdate} />
            <Button text="Cancelar" onClick={() => setSelectedSubject(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarMateria;
