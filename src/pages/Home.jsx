import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'; 
import '../styles/Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <img src={logo} alt="Logo" className="logo" />
      <h1 className='titulo'>Bienvenido a la Plataforma de Educación en Línea</h1>
      <p className='descripcion'>
        En nuestra plataforma, podrás acceder a cursos de alta calidad, impartidos por instructores calificados. 
        Regístrate como estudiante para comenzar tu aprendizaje, o como instructor para compartir tus conocimientos.
      </p>
      
      <div className='botones-container'>
        <div className='boton'>
          <h2>Para Estudiantes</h2>
          <Link to="/login">
            <button>Iniciar Sesión Estudiante</button>
          </Link>
          <Link to="/register">
            <button>Registrarse Estudiante</button>
          </Link>
        </div>

        <div className='boton'>
          <h2>Para Instructores</h2>
          <Link to="/login-instructor">
            <button>Iniciar Sesión Instructor</button>
          </Link>
          <Link to="/register-instructor">
            <button>Registrarse Instructor</button>
          </Link>
          </div>
        </div>
    </div>
  );
}

export default Home;