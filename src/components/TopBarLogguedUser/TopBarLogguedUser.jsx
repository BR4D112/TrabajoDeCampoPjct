import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopBarLogguedUser.module.css';
import logoUser from '../../assets/logo_user_loggued.png'; // Imagen del usuario logueado
import logoHome from '../../assets/logo-negative.png'; // Logo de regresar al inicio
import { Button } from '../Button/Button';

export const TopBarLoggedUser = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.TopBar}>
      {/* Logo de regresar al inicio */}
      <div className={styles.LogoContainer}>
        <img 
          src={logoHome} 
          alt="Logo de inicio" 
          className={styles.Logo} 
        />
      </div>

      <h1 className={styles.Title}>Sistema de Asignación y Gestión Educativa</h1>

      <div className={styles.UserSection}>
        {/* Imagen del usuario logueado */}
        <img 
          src={logoUser} 
          alt="Usuario Logueado" 
          className={styles.UserLogo} 
          onClick={toggleMenu} 
        />

        {menuOpen && (
          <div className={styles.DropdownMenu}>
            <Button text="Cerrar sesión" onClick={handleLogout} />
          </div>
        )}
      </div>
    </header>
  );
};
