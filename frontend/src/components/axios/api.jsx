import axios from "axios";

const api = axios.create({
  baseURL: "https://larry-birdless-demandingly.ngrok-free.dev/api",
});

async function login(email, password) {
  const res = await api.post("/login", { email, password });
  const token = res.data.token;
  localStorage.setItem("token", token); // guardas localmente
  return token;
}

export default api;