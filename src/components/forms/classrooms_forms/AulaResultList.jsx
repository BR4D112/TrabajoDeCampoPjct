// components/forms/aula_forms/AulaResultsList.jsx
import styles from './AulaResultList.module.css'; // crea este CSS basado en el de docentes

const AulaResultsList = ({ results, onSelect }) => {
  return (
    <div className={styles.resultsContainer}>
      <p><strong>Resultados encontrados: {results.length}</strong></p>
      {results.map((aula) => (
        <div
          key={aula.id}
          className={styles.resultItem}
          onClick={() => onSelect(aula)}
        >
          <p><strong>{aula.name || "-"}</strong></p>
          <p>Capacidad: {aula.capacity || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default AulaResultsList;
