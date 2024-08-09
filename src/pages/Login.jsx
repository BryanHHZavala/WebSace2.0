import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/img/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/loginCursante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UsuarioCursante: email,
          ContraseniaCursante: password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);

        // Almacena la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify({
          id: result.id,
          nombre: result.nombre,
          apellido: result.apellido
        }));

        navigate('/homealumno');
      } else {
        toast.error(result.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      toast.error('Error de red o del servidor.');
    }
  };

  return (
    <div className='r-container'>
      <img src={logo} alt="Logo" className="logo" />
      <span className='titulo'>Secretaría de Educación</span>
      <span className='sub-titulo'>Inicio de Sesión como estudiante</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Ingrese su correo: '
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Ingrese su contraseña: '
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link>.</p>
    </div>
  );
};

export default Login;
