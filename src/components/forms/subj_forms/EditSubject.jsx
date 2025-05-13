import EditSubjectForm from "./EditSubjectForm";

const EditarMateria = ({ subject, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>← Volver</button>
      <EditSubjectForm
        initialData={subject}
        onSubmitRequest={onBack}
      />
    </div>
  );
};

export default EditarMateria;
