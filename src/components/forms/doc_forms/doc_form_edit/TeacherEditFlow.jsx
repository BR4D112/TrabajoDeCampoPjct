// TeacherEditFlow.js
import { useState } from 'react';
import SearchModal from './SearchModal';
import SearchResultsList from './SearchResultsList';
import EditDocenteForm from './EditDocenteForm'; // lo harás basado en DocForm
import { searchDocentes } from './services/TeacherService';

const TeacherEditFlow = () => {
  const [searching, setSearching] = useState(true);
  const [results, setResults] = useState([]);
  const [selectedDocente, setSelectedDocente] = useState(null);

  const handleSearch = async (query) => {
    try {
      const token = localStorage.getItem('token');
      const res = await searchDocentes(query, token);
      setResults(res);
    } catch (err) {
      alert('Error al buscar docentes: ' + err.message);
    }
  };

  const handleCancelSearch = () => {
    setSearching(false);
  };

  const handleSelectDocente = (docente) => {
    setSelectedDocente(docente);
  };

  if (selectedDocente) {
    return <EditDocenteForm initialData={selectedDocente} onSubmitRequest={() => setSelectedDocente(null)} />;
  }

  return (
    <div>
      {searching && <SearchModal onSearch={handleSearch} onCancel={handleCancelSearch} />}
      {!searching && results.length > 0 && (
        <SearchResultsList results={results} onSelect={handleSelectDocente} />
      )}
    </div>
  );
};

export default TeacherEditFlow;
