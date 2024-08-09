import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importa toast
import logo from '../assets/img/logo.png';

const Register = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/cursante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_cursante: id,
          NombreCursante: nombre,
          ApellidoCursante: apellido,
          CorreoCursante: correo,
          TelefonoCursante: telefono,
          UsuarioCursante: usuario,
          ContraseniaCursante: contrasenia,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Registro exitoso'); // Muestra un mensaje de éxito
        // Limpia los campos del formulario
        setId('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setTelefono('');
        setUsuario('');
        setContrasenia('');
      } else {
        toast.error('Error al registrar'); // Muestra un mensaje de error
      }
    } catch (err) {
      toast.error('Error de red o del servidor.'); // Muestra un mensaje de error
    }
  };

  return (
    <div className='r-container'>
      <img src={logo} alt="Logo" className="logo" />
      <span className='titulo'>Secretaría de Educación</span>
      <span className='sub-titulo'>Registro de estudiantes</span>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder='Ingrese su identidad: '
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder='Ingrese su nombre: '
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder='Ingrese su apellido: '
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="email"
          placeholder='Ingrese su correo: '
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="tel"
          placeholder='Ingrese su número de teléfono: '
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder='Ingrese su usuario: '
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder='Ingrese una contraseña: '
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>.</p>
    </div>
  );
}

export default Register;
