import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import MisCursosSidebar from "../components/MisCursosSidebar";
import "../styles/MisCursos.css";

const MisCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        // Redirigir si el usuario no está autenticado
        window.location.href = '/';
        return;
      }

      const { id } = JSON.parse(storedUser);

      try {
        const response = await fetch(`http://localhost:3000/api/misCursos/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los cursos');
        }
        const data = await response.json();
        setCursos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="mis-cursos">
      <div className="main-content">
        <MisCursosSidebar />
        <div className="course-container">
          {loading && <p>Cargando cursos...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && cursos.length === 0 ? (
            <p>No te has inscrito en ningún curso</p>
          ) : (
            cursos.map((course) => (
              <div key={course._id} className="course-card">
                <h3>{course.NombreCurso}</h3>
                <Button variant="primary" onClick={() => handleOpenModal(course)}>Ingresar</Button>
              </div>
            ))
          )}
        </div>

        {selectedCourse && (
          <Modal show={true} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCourse.NombreCurso}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Descripción:</strong> {selectedCourse.DescripCurso}</p>
              <p><strong>Docente:</strong> {selectedCourse.id_docente}</p>
              <p><strong>Cantidad de Cursantes:</strong> {selectedCourse.CantidadCursantes}</p>
              {/* Aquí puedes agregar más detalles si es necesario */}
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

export default MisCursos;
