import { useState } from "react";
import CreateSubjectStarter from "./CreateSubjectStarter";
import SubjectFormGroup from "./add_sub_form"; // Asegúrate de que esta ruta esté correcta

const CrearMateria = ({ token }) => {
  const [config, setConfig] = useState(null); // Este estado gestiona la configuración

  return (
    <div>
      {!config ? (
        <CreateSubjectStarter onContinue={setConfig} /> // Cuando se complete, se pasa la configuración
      ) : (
        <div>
          {/* Muestra el formulario de creación de materias */}
          <SubjectFormGroup
            academic_period_id={config.academic_period_id}
            semester={config.semester}
            subjectCount={config.subjectCount}
          />
        </div>
      )}
    </div>
  );
};

export default CrearMateria;
