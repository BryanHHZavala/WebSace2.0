import React from 'react';
import '../styles/CursosEstudiante.css';

const CursosEstudiante = () => {
  return (
    <div className="cursos-estudiante-container">
      <aside className="sidebar">
        <div className="perfil">
          <div className="avatar"></div>
          <h2 className="usuario">usuario</h2>
        </div>
        <button className="editar-perfil">Editar Perfil</button>
      </aside>
      <main className="main-content">
        <button className="buscar-curso">Buscar curso</button>
        <div className="cursos">
          <div className="curso">curso 1</div>
          <div className="curso">curso 2</div>
          <div className="curso">curso 3</div>
        </div>
      </main>
    </div>
  );
}

export default CursosEstudiante;
