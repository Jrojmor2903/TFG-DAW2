import axios from "axios";

const api = axios.create({
  baseURL: "https://tfg-daw2.onrender.com/api",
headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export async function login(email, password) {
  const res = await api.post("/login", { email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
}


export async function validarToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {

    const res = await api.post("/auth/check-token", { token });
    return res.data.valid;
  } catch (err) {
    console.error("Error validando token:", err);
    return false;
  }
}


export async function getNivel(userId) {

  const res = await api.get(`/user/${userId}/nivel`); 
  return res.data;
}

export default api;