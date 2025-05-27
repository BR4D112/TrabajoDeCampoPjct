// components/forms/aula_forms/EditAulaForm.jsx
import { useState, useEffect } from "react";
import Input from "../../inputs/Input";
import Textarea from "../../textarea/textarea";
import Select from "../../selects/select";
import { Button } from "../../Button/Button";
import ConfirmModal from "../../modal/ConfirmModal";
import { updateAula } from "./AulaService";

const EditAulaForm = ({ initialData, onFormDirty, onSubmitRequest }) => {
  const [value, setValue] = useState({
    name: "",
    capacity: "",
    additional_info: "",
    type: "",
    is_active: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      setValue({
        ...initialData,
        is_active: initialData.is_active ? "Sí" : "No",
      });
    }
  }, [initialData]);

  useEffect(() => {
    onFormDirty?.(isDirty);
  }, [isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);   
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const aulaData = {
        ...value,
        capacity: parseInt(value.capacity),
        is_active: value.is_active === "Sí",
      };

      const res = await updateAula(initialData.id, aulaData, token);
      alert("Aula actualizada correctamente");
      setIsDirty(false);
      setShowConfirmModal(false);
      onSubmitRequest?.();
    } catch (err) {
      console.error("Error al actualizar aula:", err.message);
      alert("No se pudo actualizar el aula: " + err.message);
    }
  };

  return (
    <>
      <form>
        <h1>Editar Aula</h1>
        <Input name="name" placeholder="Nombre" value={value.name} onChange={handleChange} />
        <Input name="capacity" type="number" placeholder="Capacidad" value={value.capacity} onChange={handleChange} />
        <Textarea name="additional_info" placeholder="Información adicional" value={value.additional_info} onChange={handleChange} />
        <Select
        name="type"
        label="Tipo"
        value={value.type}
        onChange={handleChange}
        options={[
            { value: "theoretical", label: "Teórica" },
            { value: "laboratory", label: "Laboratorio" },
            { value: "auditorium", label: "Auditorio" },
            { value: "computer_lab", label: "Laboratorio de cómputo" },
        ]}
        />

        <Select name="is_active" label="¿Está activa?" value={value.is_active} onChange={handleChange} options={[
          { value: "Sí", label: "Sí" },
          { value: "No", label: "No" },
        ]} />
        <Button type="submit" text="Guardar cambios" onClick={(e) => { e.preventDefault(); setShowConfirmModal(true); }} />
      </form>

      {showConfirmModal && (
        <ConfirmModal
          title="Confirmar cambios"
          message="¿Deseas guardar los cambios del aula?"
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default EditAulaForm;
