import baseAxios from "axios";

export const foreAxios = baseAxios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axios = baseAxios.create({
  baseURL: process.env.REACT_APP_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
