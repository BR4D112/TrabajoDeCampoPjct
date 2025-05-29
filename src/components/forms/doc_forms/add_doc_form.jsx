// DocForm.js
import { useState, useEffect } from "react";
import Input from "../../inputs/Input";
import Select from "../../selects/select";
import Textarea from "../../textarea/textarea";
import { Button } from "../../Button/Button";
import { createDocente } from "./services/TeacherService";

const fieldLabels = {
  full_name: "Nombre completo",
  institutional_email: "Correo institucional",
  gender: "Género",
  academic_level: "Nivel académico",
  contract_type_id: "Tipo de contrato",
  is_active: "¿Está activo?",
  availability: "Disponibilidad",
};

const translateErrorMessage = (message) => {
  if (!message) return "";

  if (message.includes("Institutional email is already registered")) {
    return "El correo institucional ya está registrado";
  }
  if (message.includes("Please Fill out this field")) {
    return "Por favor, complete este campo";
  }
  // Agrega más traducciones si quieres

  return message; // mensaje original si no está traducido
};

const DocForm = ({ onFormDirty, onSubmitRequest }) => {
  const [value, setValue] = useState({
    full_name: "",
    institutional_email: "",
    gender: "",
    academic_level: "",
    contract_type_id: "",
    is_active: "",
    availability: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    // Excluir disponibilidad de la validación de campos vacíos
    const emptyFields = Object.entries(value).filter(
      ([key, val]) => key !== "availability" && (!val || val.trim() === "")
    );

    if (emptyFields.length > 0) {
      setErrorMessage(
        `Por favor complete todos los campos. Faltan: ${emptyFields
          .map(([key]) => fieldLabels[key] || key)
          .join(", ")}`
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const docenteData = {
        ...value,
        contract_type_id: parseInt(value.contract_type_id),
        is_active: value.is_active === "Sí",
      };

      await createDocente(docenteData, token);

      alert("Docente creado exitosamente");
      setIsDirty(false);
      setErrorMessage("");
      setValue({
        full_name: "",
        institutional_email: "",
        gender: "",
        academic_level: "",
        contract_type_id: "",
        is_active: "",
        availability: "",
      });
      onSubmitRequest?.();
    } catch (error) {
      console.error("Error al crear docente:", error.message);
      setErrorMessage(
        "No se pudo crear el docente: " + translateErrorMessage(error.message)
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <form>
        <h1>Formulario para añadir docentes</h1>

        {/* Contenedor con altura fija para mensaje de error */}
        <div
          style={{
            minHeight: "3rem", // espacio reservado fijo
            marginBottom: "1rem",
            padding: errorMessage ? "0.75rem 1rem" : "0",
            borderRadius: "4px",
            backgroundColor: errorMessage ? "#f8d7da" : "transparent",
            color: errorMessage ? "#721c24" : "transparent",
            border: errorMessage ? "1px solid #f5c6cb" : "none",
            fontWeight: "bold",
            overflowWrap: "break-word",
            whiteSpace: "normal",
            transition: "all 0.3s ease", // suave transición si quieres
          }}
        >
          {errorMessage}
        </div>

        <Input
          type="text"
          name="full_name"
          placeholder="Nombre completo"
          value={value.full_name}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          name="institutional_email"
          placeholder="Correo institucional"
          value={value.institutional_email}
          onChange={handleInputChange}
        />
        <Select
          name="gender"
          value={value.gender}
          onChange={handleInputChange}
          options={[
            { value: "F", label: "F" },
            { value: "M", label: "M" },
          ]}
          label="Género"
        />
        <Select
          name="academic_level"
          value={value.academic_level}
          onChange={handleInputChange}
          options={[
            { value: "Specialization", label: "Especialización" },
            { value: "Master", label: "Maestría" },
            { value: "PhD", label: "Doctorado" },
            { value: "PostDoc", label: "Posdoctorado" },
          ]}
          label="Nivel académico"
        />

        <Select
          name="contract_type_id"
          value={value.contract_type_id}
          onChange={handleInputChange}
          options={[
            { value: "3", label: "Planta tiempo completo" },
            { value: "4", label: "Planta medio tiempo" },
            { value: "5", label: "Ocasional tiempo completo" },
            { value: "6", label: "Ocasional medio tiempo" },
            { value: "7", label: "Cátedra" },
          ]}
          label="Tipo de contrato"
        />

        <Select
          name="is_active"
          value={value.is_active}
          onChange={handleInputChange}
          options={[
            { value: "Sí", label: "Sí" },
            { value: "No", label: "No" },
          ]}
          label="¿Está activo?"
        />
        <Textarea
          name="availability"
          placeholder="Disponibilidad"
          value={value.availability}
          onChange={handleInputChange}
        />
        <Button type="submit" text="Enviar" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default DocForm;
