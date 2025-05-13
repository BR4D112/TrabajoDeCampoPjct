import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { MainPage } from './pages/login/MainPage';
import { RecoverPassword } from './pages/forgotPassword/RecoverPassword';
import { RecoverPassword as Second } from './pages/forgotPassword/SecondVersionRecover';
import { TopBarLoggedUser } from './components/TopBarLogguedUser/TopBarLogguedUser';
import { Sidebar } from './components/Sidebar/Sidebar';
import DocForm from './components/forms/doc_forms/add_doc_form';
import EditDocenteForm from './components/forms/doc_forms/doc_form_edit/edit_doc_form';
import SearchModal from './components/modal/SearchModal';
import ConfirmModal from './components/modal/ConfirmModal';
import SearchResultsList from './components/forms/doc_forms/doc_form_edit/SearchResultsList';
import { searchDocentes } from './components/forms/doc_forms/services/TeacherService';
import CreateSubject from './components/forms/subj_forms/CreateSubject';
import CrearGrupo from './components/forms/group_forms/CreateGroup';
import { searchSubjects } from "./components/forms/subj_forms/services/SubServices";

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

      if (newSection === "editar-docente" || newSection === "editar-materia") {
        setPendingSection(newSection);
        setShowSearchModal(true);
      } else {
        setSection(newSection);
      }
    }
  };

  const handleSearchConfirm = async (term) => {
    try {
      setSelectedDocente(null);
      setSearchResults([]);
      const token = localStorage.getItem("token");
      const results = await searchDocentes(term, token);
      setSearchResults(results);
      setSearchTerm(term);
      setShowSearchModal(false);
      setSection("editar-docente");
    } catch (err) {
      alert("Error al buscar docentes: " + err.message);
    }
  };

const handleSearchModalConfirm = async (term) => {
  try {
    const token = localStorage.getItem("token");
    let results = [];

    if (pendingSection === "editar-docente") {
      const res = await searchDocentes(term, token);
      results = res;
      setSelectedDocente(null);
    } else if (pendingSection === "editar-materia") {
      const res = await searchSubjects(term, token); // Aquí se utiliza searchSubjects
      results = res;
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
      console.log("Datos enviados al servidor:", pendingFormData);
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
        if (!selectedDocente) {
          return (
            <SearchResultsList
              results={searchResults}
              onSelect={(docente) => {
                setSelectedDocente(docente);
              }}
            />
          );
        } else {
          return (
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
        }
      case 'crear-materia':
        return <CreateSubject />;
      case 'editar-materia':
        if (!selectedSubject) {
          return (
            <SearchResultsList
              results={searchResults}
              onSelect={(subject) => {
                setSelectedSubject(subject);
              }}
            />
          );
        } else {
          return (
            <EditSubjectForm
              initialData={selectedSubject}
              onFormDirty={setFormDirty}
              onSubmitRequest={() => {
                setFormDirty(false);
                setSelectedSubject(null);
                setSection("");
              }}
            />
          );
        }
      case 'crear-grupo':
        return <CrearGrupo />;
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
