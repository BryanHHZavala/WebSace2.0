import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiGraduationCapLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import '../styles/AlumnoSidebar.css';
import usuario from '../assets/img/usuario.png';

const AlumnoSidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar el usuario del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Elimina el usuario del localStorage
    localStorage.removeItem('user');
    // Redirige al usuario a la página de inicio de sesión
    navigate('/');
  };

  const handleGoToCourses = () => {
    // Redirige a la página de mis cursos
    navigate('/miscursos');
  };

  return (
    <div className="Alumnosidebar">
      <div className="user-info">
        <div className="user-avatar">
          <img src={usuario} alt="usuario" />
        </div>
        <div className="user-details">
          {user ? (
            <>
              <h4>{user.nombre} {user.apellido}</h4>
              <p>ID: {user.id}</p>
            </>
          ) : (
            <p>Cargando información del usuario...</p>
          )}
        </div>
      </div>
      <nav className="menu">
        <ul>
          <li onClick={handleGoToCourses}>
            <RiGraduationCapLine /> Mis Cursos
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AlumnoSidebar;
