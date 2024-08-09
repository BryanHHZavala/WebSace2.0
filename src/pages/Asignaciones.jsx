import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Asignaciones.css';

const Asignaciones = () => {
  const navigate = useNavigate();

  return (
    <div className="asignaciones-container">
      <div className="tabs-container">
        <button className="tab active">Asignaciones</button>
        <button className="tab" onClick={() => navigate('/calificaciones')}>Calificaciones</button>
      </div>
      <div className="content">
        <button className="add-assignment-btn">Agregar Asignacion</button>
        <div className="assignments-list">
        <div className="assignment-item">
              <h3>Matemáticas</h3>
              <p>Proyecto Final de Matemáticas</p>
              <p>Asignada por: Prof. Juan Pérez</p>
              <p>Fecha de Entrega: 15 de agosto, 2024</p>
            </div>

            <div className="assignment-item">
              <h3>Historia</h3>
              <p>Ensayo sobre la Revolución Industrial</p>
              <p>Asignada por: Prof. María Gonzáles</p>
              <p>Fecha de Entrega: 22 de septiembre, 2024</p>
            </div>
            
            <div className="assignment-item">
              <h3>Química</h3>
              <p>Tarea de Reacciones Químicas</p>
              <p>Asignada por: Prof. Carlos Hernández</p>
              <p>Fecha de Entrega: 5 de octubre, 2024 </p>
            </div>

            <div className="assignment-item">
              <h3>Biología</h3>
              <p>Investigación sobre Ecosistemas</p>
              <p>Asignada por: Prof. Ana Rodríguez</p>
              <p>Fecha de Entrega: 12 de noviembre, 2024 </p>
            </div>

            <div className="assignment-item">
              <h3>Física Elemental</h3>
              <p>Ejercicios de Movimiento Rectilíneo Uniforme</p>
              <p>Asignada por: Prof. Bryan Zavala</p>
              <p>Fecha de Entrega: 5 de diciembre, 2024 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Asignaciones;

