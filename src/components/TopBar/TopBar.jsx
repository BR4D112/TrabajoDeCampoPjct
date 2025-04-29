import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from './TopBar.module.css';
import logo from '../../assets/logo-negative.png';
import { Button } from '../../components/Button/Button';

export const TopBar = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para redirigir al menú principal
  const handleGoToMenu = () => {
    navigate('/'); // Redirige a la ruta principal "/"
  };

  return (
    <header className={styles.TopBar}>
      <a href="/" className={styles.LogoContainer}>
        <img src={logo} alt="Logo regresar al inicio" className={styles.Logo} />
      </a>
      <h1 className={styles.Title}>Sistema de Asignación y Gestión Educativa</h1>
      <div className={styles.ButtonContainer}>
        {/* Usa el onClick para navegar */}
        <Button text="Volver al menú principal" onClick={handleGoToMenu} />
      </div>
    </header>
  );
};
