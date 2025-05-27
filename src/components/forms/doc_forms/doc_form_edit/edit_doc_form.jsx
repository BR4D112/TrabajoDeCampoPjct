import { useState, useEffect } from "react";
import Input from "../../../inputs/Input";
import Select from "../../../selects/select";
import Textarea from "../../../textarea/textarea";
import { Button } from "../../../Button/Button";
import { updateDocente } from "../services/TeacherService";
import ConfirmModal from "../../../modal/ConfirmModal"; // ajusta la ruta si es necesario

const EditDocenteForm = ({ initialData, onFormDirty, onSubmitRequest }) => {
  const [value, setValue] = useState({
    full_name: "",
    institutional_email: "",
    gender: "",
    academic_level: "",
    contract_type_id: "",
    is_active: "",
    availability: ""
  });

  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 👈 NUEVO estado para modal

  useEffect(() => {
    if (initialData) {
      setValue({
        ...initialData,
        is_active: initialData.is_active ? "Sí" : "No"
      });
    }
  }, [initialData]);

  useEffect(() => {
    onFormDirty?.(isDirty);
  }, [isDirty]);

  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target;
    setIsDirty(true);
    setValue((prevValue) => ({
      ...prevValue,
      [name]: inputValue.trimStart()
    }));
  };

  const handleFormSubmit = async () => {
    const emptyFields = Object.entries(value).filter(([_, val]) => {
      if (typeof val === 'string') return val.trim() === '';
      return val === null || val === undefined;
    });

    if (emptyFields.length > 0) {
      alert(`Por favor complete todos los campos. Faltan: ${emptyFields.map(([key]) => key).join(', ')}`);
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const docenteData = {
        ...value,
        contract_type_id: parseInt(value.contract_type_id),
        is_active: value.is_active === "Sí",
      };

      const response = await updateDocente(initialData.id, docenteData, token);
      alert('Docente actualizado exitosamente');
      setIsDirty(false);
      onSubmitRequest?.();
      setShowConfirmModal(false); // 👈 Cierra el modal después del éxito
    } catch (error) {
      console.error('Error al actualizar docente:', error.message);
      alert('No se pudo actualizar el docente: ' + error.message);
    }
  };

  const handleOpenConfirmModal = (e) => {
    e.preventDefault(); // 👈 evita submit automático
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <form>
        <h1>Formulario para editar docente</h1>
        <Input type="text" name="full_name" placeholder="Nombre completo" value={value.full_name} onChange={handleInputChange} />
        <Input type="email" name="institutional_email" placeholder="Correo institucional" value={value.institutional_email} onChange={handleInputChange} />
        <Select name="gender" value={value.gender} onChange={handleInputChange} options={[{ value: "F", label: "F" }, { value: "M", label: "M" }]} label="Género" />
        <Select name="academic_level" value={value.academic_level} onChange={handleInputChange} options={[
          { value: "Specialization", label: "Especialización" },
          { value: "Master", label: "Maestría" },
          { value: "Doctorate", label: "Doctorado" },
          { value: "PostDoc", label: "Posdoctorado" }
        ]} label="Nivel académico" />
        <Select name="contract_type_id" value={value.contract_type_id} onChange={handleInputChange} options={[
          { value: 3, label: "Planta tiempo completo" },
          { value: 4, label: "Planta medio tiempo" },
          { value: 5, label: "Ocasional tiempo completo" },
          { value: 6, label: "Ocasional medio tiempo" },
          { value: 7, label: "Cátedra" }
        ]} label="Tipo de contrato" />
        <Select name="is_active" value={value.is_active} onChange={handleInputChange} options={[{ value: "Sí", label: "Sí" }, { value: "No", label: "No" }]} label="¿Está activo?" />
        <Textarea name="availability" placeholder="Disponibilidad" value={value.availability} onChange={handleInputChange} />
        <Button type="submit" text="Guardar cambios" onClick={handleOpenConfirmModal} />
      </form>

      {showConfirmModal && (
        <ConfirmModal
          title="Confirmar edición"
          message="¿Está seguro de que desea guardar los cambios del docente?"
          onConfirm={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditDocenteForm;
