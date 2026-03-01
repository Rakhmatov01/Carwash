// api/axios.js
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { refreshApi } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// har requestda access token qo'yish
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 bo'lsa accessni yangilash
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = useAuthStore.getState().refreshToken;
        const r = await refreshApi(refresh);

        const newAccess = r.data.access;

        // zustand store'da accessni yangilash
        useAuthStore.getState().setAccessToken(newAccess);

        // eski requestni qayta yuborish
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (e) {
        useAuthStore.getState().logout();
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default api;