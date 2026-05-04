import Login from "./views/Login.jsx";
import Juego from "./views/Juego.jsx"
import Inicio from "./views/Inicio.jsx";
import RutaProtected from "./components/rutasProtec/RutaProtected.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Biglayout from "./components/biglayout/BigLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Biglayout />}>
          <Route index element={<RutaProtected><Inicio /></RutaProtected>} />
        </Route>
          <Route path="/juego" element={<RutaProtected><Juego /></RutaProtected>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
