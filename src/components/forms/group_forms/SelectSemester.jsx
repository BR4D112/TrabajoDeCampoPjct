import React from "react";
import Select from "../../selects/select";

const SelectSemester = ({ value, onChange }) => {
  const semesterOptions = [
    { value: 1, label: "Semestre 1" },
    { value: 2, label: "Semestre 2" },
    { value: 3, label: "Semestre 3" },
    { value: 4, label: "Semestre 4" },
    { value: 5, label: "Semestre 5" },
    { value: 6, label: "Semestre 6" },
    { value: 7, label: "Semestre 7" },
    { value: 8, label: "Semestre 8" },
    { value: 9, label: "Semestre 9" },
    { value: 10, label: "Semestre 10" },
  ];

  return (
    <Select
      name="semester"
      label="Seleccione el semestre"
      value={value}
      onChange={onChange}
      options={semesterOptions}
    />
  );
};

export default SelectSemester;
