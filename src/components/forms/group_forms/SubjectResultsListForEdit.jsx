import React, { useState } from 'react';
import styles from './SubjectResultsListForEdit.module.css';
import { SEARCH_GROUP } from '../../../API/Endpoints';
import EditGroupModal from './EditGroupModal';
import { Button } from '../../Button/Button'; // ✅ Tu botón personalizado

const SubjectResultsListForEdit = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${SEARCH_GROUP}?subject_id=${subject.id}`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setGroups(data);
    } catch (error) {
      console.error("Error al cargar grupos:", error);
    }
  };

  return (
    <div className={styles.resultsContainer}>
      <p><strong>Materias encontradas: {subjects?.length || 0}</strong></p>
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className={styles.resultItem}
          onClick={() => handleSubjectClick(subject)}
        >
          <p><strong>{subject.code} - {subject.name}</strong></p>
        </div>
      ))}

      {selectedSubject && groups.length > 0 && (
        <div className={styles.groupList}>
          <h4>Grupos de {selectedSubject.name}</h4>
          {groups.map((group) => (
            <Button
              key={group.id}
              text={group.code}
              type="button"
              onClick={() => setSelectedGroup(group)}
            />
          ))}
        </div>
      )}

      {selectedGroup && (
        <EditGroupModal
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  );
};

export default SubjectResultsListForEdit;
