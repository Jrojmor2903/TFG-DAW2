import axios from "axios";

const api = axios.create({
  baseURL: "https://tfg-daw2.onrender.com/api",
headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
});

// Interceptor automático para el Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- FUNCIONES DE PETICIONES (API CALLS) ---

// 1. Login
export async function login(email, password) {
  const res = await api.post("/login", { email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
}

// 2. Nueva función: Validar Token en Laravel
export async function validarToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Mandamos el token en el body como quería tu controlador
    const res = await api.post("/auth/check-token", { token });
    return res.data.valid; // Devuelve true o false
  } catch (err) {
    console.error("Error validando token:", err);
    return false;
  }
}

// 3. Obtener Nivel (Corregido: el ID o datos del usuario debes pasarlos por parámetro)
export async function getNivel(userId) {
  // Ya no usamos el hook aquí. El componente de React te debe pasar el userId
  const res = await api.get(`/user/${userId}/nivel`); 
  return res.data;
}

// Exportamos la instancia por defecto por si la usas en tus componentes (ej: api.get('/ranking'))
export default api;