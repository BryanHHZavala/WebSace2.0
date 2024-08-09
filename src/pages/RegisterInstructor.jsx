import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importa toast
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de que el CSS esté importado
import logo from '../assets/img/logo.png';

const RegisterInstructor = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [especialidades, setEspecialidades] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/docente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_Docente: id,
          NombreDocente: nombre,
          ApellidoDocente: apellido,
          CorreoDocente: correo,
          TelefonoDocente: telefono,
          DireccionDocente: direccion,
          Especialidades: especialidades,
          UsuarioDocente: usuario,
          ContraseniaDocente: contrasenia,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Registro exitoso');
        // Limpia los campos del formulario
        setId('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setTelefono('');
        setDireccion('');
        setEspecialidades('');
        setUsuario('');
        setContrasenia('');
      } else {
        toast.error(result.message || 'Error al registrar');
      }
    } catch (err) {
      toast.error('Error de red o del servidor.');
    }
  };

  return (
    <div className='r-container'>
      <img src={logo} alt="Logo" className="logo" />
      <span className='titulo'>Secretaría de Educación</span>
      <span className='sub-titulo'>Registro de Instructores</span>
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
          placeholder='Ingrese su dirección: '
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="text"
          placeholder='Ingrese sus especialidades: '
          value={especialidades}
          onChange={(e) => setEspecialidades(e.target.value)}
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
      <p>¿Ya tienes una cuenta? <Link to="/login-instructor">Inicia Sesión como Instructor</Link>.</p>
    </div>
  );
}

export default RegisterInstructor;
