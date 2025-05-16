import { useState, useEffect } from "react";
import Input from "../../inputs/Input";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";
import { updateSubject } from "./services/SubServices"; // Asegúrate de que aquí se actualice correctamente
import { UPDATE_SUBJECT } from "../../../API/Endpoints";

const EditDocenteForm = ({ initialData, onFormDirty, onSubmitRequest }) => {
  const [value, setValue] = useState({
    code: "",
    name: "",
    credits: "",
    weekly_hours: "",
    is_active: "true",
  });

  useEffect(() => {
    if (initialData) {
      setValue({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    if (onFormDirty) onFormDirty(true);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      // Aquí va la lógica para actualizar materia
      await fetch(`${UPDATE_SUBJECT}${value.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...value,
          credits: parseInt(value.credits),
          weekly_hours: parseInt(value.weekly_hours),
          is_active: value.is_active === "true",
        }),
      });

      alert("Materia actualizada correctamente.");
      if (onSubmitRequest) onSubmitRequest();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar materia.");
    }
  };

  return (
    <div>
      <h2>Editar materia</h2>
      <Input placeholder="Código" name="code" value={value.code} onChange={handleChange} />
      <Input placeholder="Nombre" name="name" value={value.name} onChange={handleChange} />
      <Input placeholder="Créditos" name="credits" value={value.credits} onChange={handleChange} />
      <Input placeholder="Horas semanales" name="weekly_hours" value={value.weekly_hours} onChange={handleChange} />
      <Select
        label="¿Activa?"
        name="is_active"
        value={value.is_active}
        onChange={handleChange}
        options={[
          { label: "Sí", value: "true" },
          { label: "No", value: "false" },
        ]}
      />
      <Button text="Guardar cambios" onClick={handleSubmit} />
    </div>
  );
};

export default EditDocenteForm;
