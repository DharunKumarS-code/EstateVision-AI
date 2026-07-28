import axios from "axios";

const api = axios.create({
  baseURL: "https://estatevision-ai-8fjj.onrender.com",
});

export default api;