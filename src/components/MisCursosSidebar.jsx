import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiEntryDoor } from "react-icons/gi";
import '../styles/MisCursosSidebar.css';
import usuario from '../assets/img/usuario.png';

const MisCursosSidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar el usuario del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleBack = () => {
    navigate('/homealumno');
  };

  return (
    <div className="MisCursosSidebar">
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
          <li>
            <GiEntryDoor onClick={handleBack} /> Regresar
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MisCursosSidebar;
