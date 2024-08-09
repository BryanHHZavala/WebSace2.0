import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AlumnoSidebar from '../components/AlumnoSidebar';
import '../styles/HomeAlumno.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeAlumno = () => {
  const [cursos, setCursos] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getCursos');
        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
        toast.error('Error al obtener cursos');
      }
    };

    // Recuperar el usuario del localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchCursos();
  }, []);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  const handleAddCourse = async () => {
    if (!user) {
      toast.error('Usuario no encontrado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/admincursoA/${selectedCourse._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Id_cursante: user.id }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Curso agregado exitosamente');
        handleCloseModal(); // Cierra la modal después de agregar el curso
        // Refresca la lista de cursos si es necesario
        const updatedCursos = cursos.map((course) =>
          course._id === selectedCourse._id ? result : course
        );
        setCursos(updatedCursos);
      } else {
        toast.error(result.message || 'Error al agregar el curso');
      }
    } catch (error) {
      toast.error('Error de red o del servidor');
      console.error('Error de red o del servidor:', error);
    }
  };

  return (
    <div className="home-alumno">
      <div className="main-content">
        <AlumnoSidebar user={user} />
        <div className="course-container">
          {cursos.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.NombreCurso}</h3>
              <Button variant="primary" onClick={() => handleOpenModal(course)}>Ver</Button>
            </div>
          ))}
        </div>

        {selectedCourse && (
          <Modal show={true} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCourse.NombreCurso}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Descripción:</strong> {selectedCourse.DescripCurso}</p>
              <p><strong>Docente:</strong> {selectedCourse.docente?.NombreDocente || 'No disponible'}</p>
              <p><strong>Cantidad de Cursantes:</strong> {selectedCourse.CantidadCursantes}</p>
              <Button variant="success" onClick={handleAddCourse}>Agregar Curso</Button>
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

export default HomeAlumno;
