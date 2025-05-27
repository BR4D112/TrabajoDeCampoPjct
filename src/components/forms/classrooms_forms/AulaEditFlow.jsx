// components/forms/aula_forms/AulaEditFlow.jsx
import { useState } from 'react';
import SearchModal from '../../modal/SearchModal';
import AulaResultsList from './AulaResultList'; // ✅ nombre corregido
import EditAulaForm from './EditAulaForm';
import { searchAulas } from './AulaService';

const AulaEditFlow = () => {
  const [searching, setSearching] = useState(true);
  const [results, setResults] = useState([]);
  const [selectedAula, setSelectedAula] = useState(null);

  const handleSearch = async (query) => {
    try {
      const token = localStorage.getItem('token');
      const res = await searchAulas(query, token);
      setResults(res);
      setSearching(false); // ✅ Cierra el modal tras buscar
    } catch (err) {
      alert('Error al buscar aulas: ' + err.message);
    }
  };

  const handleCancelSearch = () => {
    setSearching(false);
  };

  const handleSelectAula = (aula) => {
    setSelectedAula(aula);
  };

  if (selectedAula) {
    return (
      <EditAulaForm
        initialData={selectedAula}
        onFormDirty={() => {}}
        onSubmitRequest={() => {
          setSelectedAula(null);
          setSearching(true);
          setResults([]);
        }}
      />
    );
  }

  return (
    <div>
      {searching && (
        <SearchModal
          onConfirm={handleSearch}
          onCancel={handleCancelSearch}
        />
      )}
      {!searching && results.length > 0 && (
        <AulaResultsList // ✅ componente correcto
          results={results}
          onSelect={handleSelectAula}
        />
      )}
    </div>
  );
};

export default AulaEditFlow;
