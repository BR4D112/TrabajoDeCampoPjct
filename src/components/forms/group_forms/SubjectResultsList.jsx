// SubjectResultsList.js
import styles from './SubjectResultsList.module.css';

const SubjectResultsList = ({ subjects, onSelect }) => {
  return (
    <div className={styles.resultsContainer}>
      <p><strong>Materias encontradas: {subjects.length}</strong></p>
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className={styles.resultItem}
          onClick={() => onSelect(subject)}
        >
          <p><strong>{subject.code} - {subject.name}</strong></p>
        </div>
      ))}
    </div>
  );
};

export default SubjectResultsList;
