import React from "react";
import styles from "./select.module.css";

const Select = ({ name, value, onChange, options, label }) => {
  return (
    <div className={styles.selectContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.customSelect}
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
