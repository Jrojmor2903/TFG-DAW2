import axios from "axios";
import { useUser } from "../../hooks/useUser";

const api = axios.create({
  baseURL: "https://larry-birdless-demandingly.ngrok-free.dev/api",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

async function login(email, password) {
  const res = await api.post("/login", { email, password });
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
}

async function getNivel() {
  const { user } = useUser();

  const res = await api.get("/login", { email, password });
}

export default api;
