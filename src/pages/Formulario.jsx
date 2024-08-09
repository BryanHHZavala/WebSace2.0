import React, { useState, useEffect } from 'react';
import FormularioSidebar from '../components/FormularioSidebar';
import '../styles/Formulario.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    category: '',
    courseName: '',
    courseDescription: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getcat'); // API para obtener todas las categorías
        const data = await response.json();
        setCategories(data); // Suponiendo que data es un array de categorías
      } catch (err) {
        toast.error('Error al obtener categorías.');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const docenteId = storedUser ? storedUser.id : ''; // Obtén el ID del docente del localStorage

    try {
      const response = await fetch('http://localhost:3000/api/registrarCursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_Curso: formData.courseId,
          id_docente: docenteId,
          id_cursante: [], // Aquí puedes incluir los IDs de los cursantes si es necesario
          id_categoria: formData.category,
          NombreCurso: formData.courseName,
          DescripCurso: formData.courseDescription,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Curso registrado con éxito.');
        setFormData({
          courseId: '',
          category: '',
          courseName: '',
          courseDescription: '',
        });
      } else {
        toast.error(result.message || 'Error al registrar el curso.');
      }
    } catch (err) {
      toast.error('Error de red o del servidor.');
    }
  };

  return (
    <div className="formulario">
      <div className="main-content">
        <FormularioSidebar />
        <div className="form-container">
          <h2>Vamos a Crear un Nuevo Curso</h2>
          <form onSubmit={handleSubmit}>
            <label>Id del curso</label>
            <input
              type="text"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
            />

            <label>Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.NombreCategorias}
                </option>
              ))}
            </select>

            <label>Nombre del Curso</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
            />

            <label>Descripción del Curso</label>
            <input
              type="text"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
            />

            <button type="submit">Agregar</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Formulario;
