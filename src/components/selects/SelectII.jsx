import React from "react";
import styles from "./select.module.css";

const SelectII = ({ label, name, value, onChange, options }) => {
  return (
    <div className={styles.selectContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.customSelect}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectII;
