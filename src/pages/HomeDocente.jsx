import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import '../styles/HomeDocente.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeDocente = () => {
  const [cursos, setCursos] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [cursantes, setCursantes] = useState([]);
  const [selectedCursante, setSelectedCursante] = useState(null); // Estado para el cursante seleccionado

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (user && user.id) {
          const response = await fetch(`http://localhost:3000/api/getcursos/${user.id}`);
          const data = await response.json();
          if (response.ok) {
            setCursos(data);
          } else {
            toast.error('Error al obtener los cursos.');
          }
        } else {
          toast.error('No se encontró información del usuario.');
        }
      } catch (err) {
        toast.error('Error de red o del servidor.');
      }
    };

    fetchCursos();
  }, []);

  const handleOpenModal = async (course) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admincursoG/${course._id}`);
      const data = await response.json();
      if (response.ok) {
        setCursantes(data);
        setSelectedCourse(course);
        setSelectedCursante(null); // Reiniciar selección de cursante al abrir modal
      } else {
        toast.error('Error al obtener cursantes.');
      }
    } catch (err) {
      toast.error('Error de red o del servidor.');
    }
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setCursantes([]);
    setSelectedCursante(null); // Reiniciar selección de cursante al cerrar modal
  };

  const handleSelectCursante = (cursanteId) => {
    setSelectedCursante(cursanteId);
  };

  const handleRemoveCursante = async () => {
    if (!selectedCourse || !selectedCursante) {
      toast.error('Curso o cursante no seleccionado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/admincursoR/${selectedCourse._id}/${selectedCursante}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Cursante eliminado exitosamente');
        setCursantes(cursantes.filter(cursante => cursante._id !== selectedCursante));
        setSelectedCursante(null); // Reiniciar selección de cursante después de eliminar
      } else {
        toast.error(result.message || 'Error al eliminar cursante');
      }
    } catch (error) {
      toast.error('Error de red o del servidor');
    }
  };

  return (
    <div className="home-docente">
      <div className="main-content">
        <Sidebar />
        <div className="course-container">
          {cursos.length > 0 ? (
            cursos.map((course) => (
              <div key={course._id} className="course-card">
                <h3>{course.NombreCurso}</h3>
                <Button variant="primary" onClick={() => handleOpenModal(course)}>
                  Ver Detalles
                </Button>
              </div>
            ))
          ) : (
            <p>No hay cursos disponibles.</p>
          )}
        </div>

        {selectedCourse && (
          <Modal show={true} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCourse.NombreCurso}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Cursantes:</h5>
              {cursantes.length > 0 ? (
                <ul>
                  {cursantes.map(cursante => (
                    <li key={cursante._id}>
                      {cursante.NombreCursante} {cursante.ApellidoCursante}
                      <Button
                        variant="primary"
                        onClick={() => handleSelectCursante(cursante._id)}
                        className={`ms-2 ${selectedCursante === cursante._id ? 'btn-success' : ''}`}
                      >
                        {selectedCursante === cursante._id ? 'Seleccionado' : 'Seleccionar'}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay cursantes en este curso.</p>
              )}
              <Button
                variant="danger"
                onClick={handleRemoveCursante}
                disabled={!selectedCursante}
                className="mt-2"
              >
                Eliminar Cursante
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomeDocente;
