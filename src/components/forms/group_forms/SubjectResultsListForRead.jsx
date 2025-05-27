import React, { useState, useEffect } from 'react';
import styles from './SubjectResultsListForEdit.module.css';
import { SEARCH_GROUP } from '../../../API/Endpoints';
import ReadOnlyGroupModal from './ReadOnlyGroupModal';
import { Button } from '../../Button/Button';

const SubjectResultsListForRead = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);
    const token = localStorage.getItem("token");

    try {
      const groupRes = await fetch(`${SEARCH_GROUP}?subject_id=${subject.id}`, {
        headers: { Authorization: token },
      });
      const groupData = await groupRes.json();
      setGroups(groupData);
    } catch (err) {
      console.error("Error al obtener grupos:", err);
    }
  };

  return (
    <div className={styles.resultsContainer}>
      <p><strong>Materias encontradas: {subjects.length}</strong></p>
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className={styles.resultItem}
          onClick={() => handleSubjectClick(subject)}
        >
          <p><strong>{subject.code} - {subject.name}</strong></p>
        </div>
      ))}

      {selectedSubject && (
        <>
          <h4>Grupos de la materia: {selectedSubject.name}</h4>
          <div className={styles.buttons}>
            {groups.map((group) => (
              <Button
                key={group.id}
                text={group.code}
                type="button"
                onClick={() => setSelectedGroup(group)}
              />
            ))}
          </div>
        </>
      )}

      {selectedGroup && (
        <ReadOnlyGroupModal
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  );
};

export default SubjectResultsListForRead;
