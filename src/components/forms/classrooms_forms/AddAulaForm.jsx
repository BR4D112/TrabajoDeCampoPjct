// components/forms/aula_forms/AddAulaForm.jsx
import { useState, useEffect } from "react";
import Input from "../../inputs/Input";
import Textarea from "../../textarea/textarea";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";
import { createAula } from "./AulaService";

const AddAulaForm = ({ onFormDirty, onSubmitRequest }) => {
  const [value, setValue] = useState({
    name: "",
    capacity: "",
    additional_info: "",
    type: "",
    is_active: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    onFormDirty?.(isDirty);
  }, [isDirty]);

  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target;
    setIsDirty(true);
    setValue((prevValue) => ({
      ...prevValue,
      [name]: inputValue.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.entries(value).filter(([_, val]) => !val);
    if (emptyFields.length > 0) {
      alert(`Faltan campos: ${emptyFields.map(([key]) => key).join(", ")}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const aulaData = {
        ...value,
        capacity: parseInt(value.capacity),
        is_active: value.is_active === "Sí",
      };

      const response = await createAula(aulaData, token);
      alert("Aula creada exitosamente");
      setIsDirty(false);
      onSubmitRequest?.();
    } catch (error) {
      console.error("Error al crear aula:", error.message);
      alert("No se pudo crear el aula: " + error.message);
    }
  };

  return (
    <form>
      <h1>Crear Aula</h1>
      <Input name="name" placeholder="Nombre del aula" value={value.name} onChange={handleInputChange} />
      <Input type="number" name="capacity" placeholder="Capacidad" value={value.capacity} onChange={handleInputChange} />
      <Textarea name="additional_info" placeholder="Información adicional" value={value.additional_info} onChange={handleInputChange} />
      <Select
        name="type"
        label="Tipo de aula"
        value={value.type}
        onChange={handleInputChange}
        options={[
            { value: "theoretical", label: "Teórica" },
            { value: "laboratory", label: "Laboratorio" },
            { value: "auditorium", label: "Auditorio" },
            { value: "computer_lab", label: "Laboratorio de cómputo" },
        ]}
        />

      <Select name="is_active" label="¿Está activa?" value={value.is_active} onChange={handleInputChange} options={[
        { value: "Sí", label: "Sí" },
        { value: "No", label: "No" },
      ]} />
      <Button type="submit" text="Crear Aula" onClick={handleSubmit} />
    </form>
  );
};

export default AddAulaForm;
