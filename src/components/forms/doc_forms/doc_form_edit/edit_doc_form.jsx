import { useState, useEffect } from "react";
import Input from "../../../inputs/Input";
import Select from "../../../selects/select";
import Textarea from "../../../textarea/textarea";
import { Button } from "../../../Button/Button";
import { updateDocente } from "../services/TeacherService";
import ConfirmModal from "../../../modal/ConfirmModal"; // Ajusta la ruta si es necesario

const EditDocenteForm = ({ initialData, onFormDirty, onSubmitRequest }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    institutional_email: "",
    gender: "",
    academic_level: "",
    contract_type_id: "",
    is_active: "",
    availability: ""
  });

  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        contract_type_id: String(initialData.contract_type_id),
        is_active: initialData.is_active ? "Sí" : "No"
      });
    }
  }, [initialData]);

  useEffect(() => {
    onFormDirty?.(isDirty);
  }, [isDirty, onFormDirty]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [name]: value.trimStart()
    }));
  };

  const validateForm = () => {
    const emptyFields = Object.entries(formData).filter(([_, val]) => {
      if (typeof val === "string") return val.trim() === "";
      return val === null || val === undefined;
    });

    if (emptyFields.length > 0) {
      alert(`Por favor complete todos los campos. Faltan: ${emptyFields.map(([key]) => key).join(", ")}`);
      return false;
    }
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const token = localStorage.getItem("token");

    const docentePayload = {
      ...formData,
      contract_type_id: parseInt(formData.contract_type_id, 10),
      is_active: formData.is_active === "Sí"
    };

    // ✅ Elimina `contract_type` si está presente
    delete docentePayload.contract_type;

    await updateDocente(initialData.id, docentePayload, token);

    alert("Docente actualizado exitosamente");
    setIsDirty(false);
    setShowConfirmModal(false);
    onSubmitRequest?.();
  } catch (error) {
    console.error("Error al actualizar docente:", error);
    alert("No se pudo actualizar el docente: " + error.message);
  }
};


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }}>
        <h1>Formulario para editar docente</h1>

        <Input type="text" name="full_name" placeholder="Nombre completo" value={formData.full_name} onChange={handleInputChange} />
        <Input type="email" name="institutional_email" placeholder="Correo institucional" value={formData.institutional_email} onChange={handleInputChange} />
        
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          options={[{ value: "F", label: "F" }, { value: "M", label: "M" }]}
          label="Género"
        />

        <Select
          name="academic_level"
          value={formData.academic_level}
          onChange={handleInputChange}
          options={[
            { value: "Specialization", label: "Especialización" },
            { value: "Master", label: "Maestría" },
            { value: "Doctorate", label: "Doctorado" },
            { value: "PostDoc", label: "Posdoctorado" }
          ]}
          label="Nivel académico"
        />

        <Select
          name="contract_type_id"
          value={formData.contract_type_id}
          onChange={handleInputChange}
          options={[
            { value: "3", label: "Planta tiempo completo" },
            { value: "4", label: "Planta medio tiempo" },
            { value: "5", label: "Ocasional tiempo completo" },
            { value: "6", label: "Ocasional medio tiempo" },
            { value: "7", label: "Cátedra" }
          ]}
          label="Tipo de contrato"
        />

        <Select
          name="is_active"
          value={formData.is_active}
          onChange={handleInputChange}
          options={[{ value: "Sí", label: "Sí" }, { value: "No", label: "No" }]}
          label="¿Está activo?"
        />

        <Textarea
          name="availability"
          placeholder="Disponibilidad"
          value={formData.availability}
          onChange={handleInputChange}
        />

        <Button type="submit" text="Guardar cambios" />
      </form>

      {showConfirmModal && (
        <ConfirmModal
          title="Confirmar edición"
          message="¿Está seguro de que desea guardar los cambios del docente?"
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default EditDocenteForm;
