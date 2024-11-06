import axios from "axios";

const api = axios.create({
  baseURL: "https://myrubikon.tech/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Общая обработка ошибок апи
    return Promise.reject(error);
  }
);

export default api;
