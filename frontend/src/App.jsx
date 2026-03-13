import { useState } from 'react'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import Inicio from './views/Inicio.jsx'
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Biglayout from './components/biglayout/BigLayout.jsx'
import './general.module.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
          <Route path='/' element={ <Biglayout />}>
              <Route index element={<Inicio />} />
          </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
