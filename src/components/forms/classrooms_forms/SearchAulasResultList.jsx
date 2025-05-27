// components/forms/doc_forms/doc_form_edit/SearchResultsList.jsx
import styles from '../doc_forms/doc_form_edit/SearchResultsList.module.css';

const SearchResultsList = ({ results, onSelect }) => {
  return (
    <div className={styles.resultsContainer}>
      <p><strong>Resultados encontrados: {results.length}</strong></p>
      {results.map((item) => (
        <div
          key={item.id}
          className={styles.resultItem}
          onClick={() => onSelect(item)}
        >
          <p><strong>{item.name - item.capacity}</strong></p>
          <p>{item.capacity}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
