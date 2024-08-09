import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Asignaciones from './pages/Asignaciones';
import LoginInstructor from './pages/LoginInstructor'; 
import RegisterInstructor from './pages/RegisterInstructor'; 
import CursosEstudiantes from './pages/CursosEstudiante'; 
import CalificacionEstudiante from './pages/Calificaciones';
import HomeAlumno from './pages/HomeAlumno';
import HomeDocente from './pages/HomeDocente';
import Sidebar from './components/Sidebar';
import FormularioSidebar from './components/FormularioSidebar'
import Formulario from './pages/Formulario';
import MisCursosSidebar from "./components/MisCursosSidebar";
import MisCursos from "./pages/MisCursos";
import AlumnoSidebar from './components/AlumnoSidebar'; 
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de react-toastify

function App() {
  return (
    <div>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login-instructor" element={<LoginInstructor />} /> 
            <Route path="/register-instructor" element={<RegisterInstructor />} /> 
            <Route path="/asignaciones" element={<Asignaciones />} />
            <Route path="/homealumno" element={<HomeAlumno />} />
            <Route path="/homedocente" element={<HomeDocente />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/alumnosidebar" element={<AlumnoSidebar />} />
            <Route path="/cursosestudiantes" element={<CursosEstudiantes />} />
            <Route path="/calificacionestudiante" element={<CalificacionEstudiante />} />
            <Route path="/miscursossidebar" element={<MisCursosSidebar />} />
            <Route path="/miscursos" element={<MisCursos />} />
            <Route path="/formulariosidebar" element={<FormularioSidebar />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
          {/* Agrega el ToastContainer aquí */}
          <ToastContainer />
        </div>
      </Router>
    </div>
  );
}

export default App;
