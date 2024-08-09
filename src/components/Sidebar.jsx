import React, { useState, useEffect } from 'react';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Sidebar.css';
import usuario from '../assets/img/usuario.png';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

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
    window.location.href = '/';
  };

  const handleAddCourse = () => {
    // Redirige a la página de formulario
    navigate('/formulario');
  };

  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="user-avatar">
          <img src={usuario} alt="usuario" />
        </div>
        <div className="user-details">
          {user ? (
            <>
              <h4>{user.nombre} {user.apellido}</h4>
              <p>ID: {user.id}</p>
              <p>Docente</p>
            </>
          ) : (
            <p>Cargando información del usuario...</p>
          )}
        </div>
      </div>
      <nav className="menu">
        <ul>
          <li onClick={handleAddCourse}>
            <FaPlus /> Agregar Curso
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
