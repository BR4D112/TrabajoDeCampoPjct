// SearchResultsList.js
import styles from './SearchResultsList.module.css';

const SearchResultsList = ({ results, onSelect }) => {
  return (
    <div className={styles.resultsContainer}>
      <p><strong>Resultados encontrados: {results.length}</strong></p>
      {results.map((docente) => (
        <div
          key={docente.id}
          className={styles.resultItem}
          onClick={() => onSelect(docente)}
        >
          <p><strong>{docente.full_name} - {docente.academic_level}</strong></p>
          <p>{docente.institutional_email}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
