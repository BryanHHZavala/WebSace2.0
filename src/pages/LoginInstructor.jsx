import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { toast } from 'react-toastify'; // Importa toast
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de que el CSS esté importado
import logo from '../assets/img/logo.png';

const LoginInstructor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/loginDocente', { // Ruta de login para docentes
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UsuarioDocente: email,
          ContraseniaDocente: password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message); // Muestra un mensaje de éxito
        setSuccess(result.message);
        setError('');

        // Almacena la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify({
          id: result.id,
          nombre: result.nombre,
          apellido: result.apellido,
          role: 'instructor'
        }));

        navigate('/homedocente'); // Redirige al usuario a /homedocente
      } else {
        toast.error(result.message || 'Error al iniciar sesión'); // Muestra un mensaje de error
        setError(result.message || 'Error al iniciar sesión');
        setSuccess('');
      }
    } catch (err) {
      toast.error('Error de red o del servidor.'); // Muestra un mensaje de error
      setError('Error de red o del servidor.');
      setSuccess('');
    }
  };

  return (
    <div className='r-container'>
      <img src={logo} alt="Logo" className="logo" />
      <span className='titulo'>Secretaría de Educación</span>
      <span className='sub-titulo'>Inicio de Sesión como Instructor</span>
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
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <p>¿No tienes una cuenta? <Link to="/register-instructor">Regístrate como Instructor</Link>.</p>
    </div>
  );
};

export default LoginInstructor;
