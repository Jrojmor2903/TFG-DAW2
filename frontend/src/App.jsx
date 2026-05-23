import Login from "./views/Login.jsx";
import Juego from "./views/Juego.jsx";
import Inicio from "./views/Inicio.jsx";
import RutaProtected from "./components/rutasProtec/RutaProtected.jsx";
import RutaCreador from "./components/rutasProtec/RutaCreador.jsx";
import RutaAdmin from "./components/rutasProtec/RutaAdmin.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Biglayout from "./components/biglayout/BigLayout.jsx";
import Perfil from "./views/Perfil.jsx";
import Logros from "./views/Logros.jsx";
import Ranking from "./views/Ranking.jsx";
import Nave from "./views/Nave.jsx";
import AdminDashboard from "./views/AdminDashboard.jsx";
import Register from "./views/Register.jsx";
import CreadorNivel from "./views/CreadorNivel.jsx";
import ListaNiveles from "./views/ListaNiveles.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS DEL LAYOUT GENERAL */}
        <Route path="/" element={<Biglayout />}>
          <Route index element={<RutaProtected><Inicio /></RutaProtected>} />
          <Route path="perfil" element={<RutaProtected><Perfil /></RutaProtected>} />
          <Route path="logros" element={<RutaProtected><Logros /></RutaProtected>} />
          <Route path="ranking" element={<RutaProtected><Ranking /></RutaProtected>} />
          <Route path="naves" element={<RutaProtected><Nave /></RutaProtected>} />
          <Route path="crear-nivel" element={<RutaCreador><CreadorNivel /></RutaCreador>} />
          <Route path="lista-niveles" element={<RutaProtected><ListaNiveles /></RutaProtected>} />

          <Route 
            path="admin" 
            element={
              <RutaAdmin>
                <AdminDashboard />
              </RutaAdmin>
            } 
          />
        </Route>
        
        <Route path="/juego" element={<RutaProtected><Juego /></RutaProtected>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;