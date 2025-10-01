import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// apis

// register

export const RegisterHandler = async (formData) => {
  return await api.post(`/api/user/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

// login
export const LoginHandler = async (input) => {
  return await api.post(`/api/user/login`, input, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
