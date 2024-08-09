import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/FormularioSidebar.css';
import usuario from '../assets/img/usuario.png';

const FormularioSidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    // Recuperar el usuario del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGoBack = () => {
    // Redirige a la página de inicio del docente
    navigate('/homedocente');
  };

  return (
    <div className="formulariosidebar">
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
          <li onClick={handleGoBack}>
            <FaSignOutAlt /> Regresar
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FormularioSidebar;
