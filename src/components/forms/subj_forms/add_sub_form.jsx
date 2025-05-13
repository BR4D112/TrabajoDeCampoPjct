import { useState } from "react";
import Input from "../../inputs/Input";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";
import { CREATE_SUBJECT } from "../../../API/Endpoints.js";

const SubjectFormGroup = ({ academic_period_id, semester, subjectCount }) => {
  const emptySubject = {
    code: "",
    name: "",
    credits: "",
    weekly_hours: "",
    is_active: "true",
    type: "T",
    component: "tecnica",
  };

  const [subjects, setSubjects] = useState(
    Array.from({ length: subjectCount }, () => ({ ...emptySubject }))
  );

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    for (const subj of subjects) {
      const payload = {
        ...subj,
        semester,
        academic_period_id,
        credits: parseInt(subj.credits),
        weekly_hours: parseInt(subj.weekly_hours),
        is_active: subj.is_active === "true",
        component: mapComponentValue(subj.component), // Mapear componente aquí
      };

      try {
        const res = await fetch(CREATE_SUBJECT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Error ${res.status} creando materia`);
        }

        const data = await res.json();
        console.log("Materia creada:", data);
      } catch (err) {
        console.error("Error creando materia:", err);
      }
    }

    alert("Materias creadas exitosamente");
  };

  // Función para mapear el componente del usuario al valor aceptado por el backend
  const mapComponentValue = (value) => {
    const mapping = {
      "Proyectual": "proyectual",
      "Historia y teoría": "historia y teoria",
      "Tecnológico": "tecnica",
      "Expresión": "expresion",
      "Urbano - ambiental": "urbano ambiental",
      "Electivo - disciplinar": "electivo disciplinar",
      "Electivo - multidisciplinar": "electivo multidisciplinar",
      "Institucional": "institucional",
    };

    return mapping[value] || "tecnica"; // Por defecto, "tecnica" si no se encuentra el valor
  };

  return (
    <div>
      <h2>Formulario de materias</h2>
      {subjects.map((subject, index) => (
        <div key={index} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
          <h3>Materia #{index + 1}</h3>
          <Input
            name="code"
            placeholder="Código"
            value={subject.code}
            onChange={(e) => handleChange(index, "code", e.target.value)}
          />
          <Input
            name="name"
            placeholder="Nombre"
            value={subject.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <Input
            name="credits"
            type="number"
            placeholder="Créditos"
            value={subject.credits}
            onChange={(e) => handleChange(index, "credits", e.target.value)}
          />
          <Input
            name="weekly_hours"
            type="number"
            placeholder="Horas semanales"
            value={subject.weekly_hours}
            onChange={(e) => handleChange(index, "weekly_hours", e.target.value)}
          />
          <Select
            label="¿Activa?"
            name="is_active"
            value={subject.is_active}
            options={[{ value: "true", label: "Sí" }, { value: "false", label: "No" }]}
            onChange={(e) => handleChange(index, "is_active", e.target.value)}
          />
          <Select
            label="Tipo"
            name="type"
            value={subject.type}
            options={[{ value: "T", label: "Teórica" }, { value: "P", label: "Práctica" }, { value: "T-P", label: "Teorico-Práctica" }]}
            onChange={(e) => handleChange(index, "type", e.target.value)}
          />
          <Select
            label="Componente"
            name="component"
            value={subject.component}
            options={[
              { value: "Proyectual", label: "Proyectual" },
              { value: "Historia y teoría", label: "Historia y teoría" },
              { value: "Tecnológico", label: "Tecnológico" },
              { value: "Expresión", label: "Expresión" },
              { value: "Urbano - ambiental", label: "Urbano - ambiental" },
              { value: "Electivo - disciplinar", label: "Electivo - disciplinar" },
              { value: "Electivo - multidisciplinar", label: "Electivo - multidisciplinar" },
              { value: "Institucional", label: "Institucional" },
            ]}
            onChange={(e) => handleChange(index, "component", e.target.value)}
          />
        </div>
      ))}
      <Button text="Enviar todas" onClick={handleSubmit} />
    </div>
  );
};

export default SubjectFormGroup;
