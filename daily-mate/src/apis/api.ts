import baseAxios from "axios";

export const axios = baseAxios.create({
  baseURL: process.env.REACT_APP_URL,
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
