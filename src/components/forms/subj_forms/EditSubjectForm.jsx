import { useState, useEffect } from "react";
import Input from "../../inputs/Input";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";
import ConfirmModal from "../../modal/ConfirmModal"; // ajusta si es necesario
import { updateSubject } from "./services/SubServices"; // función que tú deberías crear

const EditSubjectForm = ({ initialData, onFormDirty, onSubmitRequest }) => {
  const [value, setValue] = useState({
    code: "",
    name: "",
    credits: "",
    weekly_hours: "",
    is_active: "true",
    type: "T",
    component: "tecnica",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      setValue({
        ...initialData,
        credits: String(initialData.credits),
        weekly_hours: String(initialData.weekly_hours),
        is_active: initialData.is_active ? "true" : "false",
      });
    }
  }, [initialData]);

  useEffect(() => {
    onFormDirty?.(isDirty);
  }, [isDirty]);

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setIsDirty(true);
    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async () => {
    const emptyFields = Object.entries(value).filter(([_, val]) => val.trim() === "");
    if (emptyFields.length > 0) {
      alert(`Por favor completa todos los campos: ${emptyFields.map(([k]) => k).join(", ")}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...value,
        credits: parseInt(value.credits),
        weekly_hours: parseInt(value.weekly_hours),
        is_active: value.is_active === "true",
        component: mapComponentValue(value.component),
      };

      await updateSubject(initialData.id, payload, token);
      alert("Materia actualizada exitosamente");
      setIsDirty(false);
      onSubmitRequest?.();
    } catch (error) {
      console.error("Error al actualizar materia:", error);
      alert("Hubo un error al actualizar la materia");
    }
  };

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
    return mapping[value] || "tecnica";
  };

  return (
    <div>
      <h2>Editar materia</h2>

      <Input name="code" value={value.code} placeholder="Código" onChange={handleChange} />
      <Input name="name" value={value.name} placeholder="Nombre" onChange={handleChange} />
      <Input name="credits" value={value.credits} type="number" placeholder="Créditos" onChange={handleChange} />
      <Input name="weekly_hours" value={value.weekly_hours} type="number" placeholder="Horas semanales" onChange={handleChange} />

      <Select
        name="is_active"
        label="¿Activa?"
        value={value.is_active}
        onChange={handleChange}
        options={[{ value: "true", label: "Sí" }, { value: "false", label: "No" }]}
      />

      <Select
        name="type"
        label="Tipo"
        value={value.type}
        onChange={handleChange}
        options={[
          { value: "T", label: "Teórica" },
          { value: "P", label: "Práctica" },
          { value: "T-P", label: "Teórico-Práctica" },
        ]}
      />

      <Select
        name="component"
        label="Componente"
        value={value.component}
        onChange={handleChange}
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
      />

      <Button text="Actualizar materia" onClick={() => setShowConfirmModal(true)} />

      <ConfirmModal
        isOpen={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleSubmit}
        message="¿Deseas guardar los cambios realizados en esta materia?"
      />
    </div>
  );
};

export default EditSubjectForm;
