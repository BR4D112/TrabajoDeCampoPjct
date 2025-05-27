import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Pages
import { MainPage } from './pages/login/MainPage';
import { RecoverPassword } from './pages/forgotPassword/RecoverPassword';
import { RecoverPassword as Second } from './pages/forgotPassword/SecondVersionRecover';

// Layout components
import { TopBarLoggedUser } from './components/TopBarLogguedUser/TopBarLogguedUser';
import { Sidebar } from './components/Sidebar/Sidebar';

// Docente forms
import DocForm from './components/forms/doc_forms/add_doc_form';
import EditDocenteForm from './components/forms/doc_forms/doc_form_edit/edit_doc_form';
import SearchResultsList from './components/forms/doc_forms/doc_form_edit/SearchResultsList';
import { searchDocentes } from './components/forms/doc_forms/services/TeacherService';

// Materia forms
import CreateSubject from './components/forms/subj_forms/CreateSubject';
import EditSubject from './components/forms/subj_forms/EditSubject';
import EditSubjectSelector from './components/forms/subj_forms/EditSubjectSelector';
import { searchSubjects } from './components/forms/subj_forms/services/SubServices';
import GenerateSchedulePage from "./components/forms/group_forms/GenerateSchedulePage";

// Grupo forms
import CrearGrupo from './components/forms/group_forms/CreateGroup';
import EditGroup from './components/forms/group_forms/EditGroup';

// Modals
import SearchModal from './components/modal/SearchModal';
import ConfirmModal from './components/modal/ConfirmModal';

// Aula forms
import CreateAulaForm from './components/forms/classrooms_forms/AddAulaForm';
import AulaEditFlow from './components/forms/classrooms_forms/AulaEditFlow';

// Views
import ViewTeachers from './components/forms/doc_forms/ViewTeachers';
import ViewSubjects from './components/forms/subj_forms/ViewSubjects';
import ViewGroups from './components/forms/group_forms/ViewGroups';
import ViewClassrooms from './components/forms/classrooms_forms/ViewClassrooms';

function App() {
  return (
    <Router>
      <div className="AppContainer">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/second" element={<Second />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

function Welcome() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [section, setSection] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingSection, setPendingSection] = useState("");
  const [formDirty, setFormDirty] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [confirmActionType, setConfirmActionType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

const handleSectionChange = (newSection) => {
  if ((section === "crear-docente" || section === "crear-materia") && formDirty) {
    setPendingSection(newSection);
    setConfirmActionType("exit");
    setShowConfirmModal(true);
  } else {
    setSearchResults([]);
    setSelectedDocente(null);
    setSelectedSubject(null);

    if (newSection === "editar-docente") {
      setPendingSection(newSection);
      setShowSearchModal(true);
    } else if (newSection === "editar-materia") {
      setSection(newSection);
    } else {
      setSection(newSection);
    }
  }
};


  const handleSearchModalConfirm = async (term) => {
    try {
      const token = localStorage.getItem("token");
      let results = [];

      if (pendingSection === "editar-docente") {
        results = await searchDocentes(term, token);
        setSelectedDocente(null);
      } else if (pendingSection === "editar-materia") {
        results = await searchSubjects(term, token);
        setSelectedSubject(null);
      }

      setSearchResults(results);
      setSearchTerm(term);
      setShowSearchModal(false);
      setSection(pendingSection);
      setPendingSection("");
    } catch (err) {
      alert("Error al buscar: " + err.message);
    }
  };

  const confirmExit = () => {
    if (confirmActionType === "exit") {
      setShowConfirmModal(false);
      setFormDirty(false);
      setSection(pendingSection);
      setPendingSection("");
    } else if (confirmActionType === "submit") {
      alert("Formulario enviado con éxito");
      setShowConfirmModal(false);
      setFormDirty(false);
      setPendingFormData(null);
      setSection("");
    }
  };

  const cancelExit = () => {
    setShowConfirmModal(false);
    setPendingSection("");
    setPendingFormData(null);
  };

  const handleFormSubmitRequest = (formData) => {
    setPendingFormData(formData);
    setConfirmActionType("submit");
    setShowConfirmModal(true);
  };

  if (!user?.first_name) {
    return <div>No autorizado</div>;
  }

  const renderContent = () => {
    switch (section) {
      case 'crear-docente':
        return (
          <DocForm 
            onFormDirty={setFormDirty}
            onSubmitRequest={handleFormSubmitRequest}
          />
        );
      case 'editar-docente':
        return !selectedDocente ? (
          <SearchResultsList
            results={searchResults}
            onSelect={setSelectedDocente}
          />
        ) : (
          <EditDocenteForm
            initialData={selectedDocente}
            onFormDirty={setFormDirty}
            onSubmitRequest={() => {
              setFormDirty(false);
              setSelectedDocente(null);
              setSection("");
            }}
          />
        );
      case 'crear-materia':
        return <CreateSubject />;

      case 'editar-materia':
        return !selectedSubject ? (
          <EditSubjectSelector
            onBack={() => setSection("")}
            onSelect={setSelectedSubject}
          />
        ) : (
          <EditSubject
            initialData={selectedSubject}
            onFormDirty={setFormDirty}
            onSubmitRequest={() => {
              setFormDirty(false);
              setSelectedSubject(null);
              setSection("");
            }}
          />
        );

      case 'ver-docentes':
        return <ViewTeachers />;
      case 'ver-materias':
        return <ViewSubjects />;
      case 'ver-grupos':
        return <ViewGroups />;
      case 'ver-aulas':
        return <ViewClassrooms />;
      case 'crear-grupo':
        return <CrearGrupo />;

      case 'editar-grupo':
        return <EditGroup />;

      case 'crear-aula':
        return <CreateAulaForm />;

      case 'editar-aula':
        return <AulaEditFlow />;

      case 'ver-horario':
        <div>Crear Reporte de Semestres</div>;
        return <GenerateSchedulePage />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div>
      <TopBarLoggedUser />
      <div style={{ display: 'flex' }}>
        <Sidebar first_name={user.first_name} setSection={handleSectionChange} />
        <div style={{ padding: '1rem', flex: 1 }}>
          {renderContent()}
        </div>
      </div>

      {showSearchModal && (
        <SearchModal
          onConfirm={handleSearchModalConfirm}
          onCancel={() => {
            setShowSearchModal(false);
            setPendingSection("");
          }}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          title="Confirmación"
          message={
            confirmActionType === "submit"
              ? "¿Estás seguro de que quieres enviar el formulario?"
              : "¿Estás seguro de que quieres salir sin guardar?"
          }
          onConfirm={confirmExit}
          onCancel={cancelExit}
        />
      )}
    </div>
  );
}

export default App;
