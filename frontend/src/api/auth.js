import axios from 'axios';
import api from './axios';

export const loginApi = (data)=>api.post("/user/login/", data);
export const registerApi = (data)=>api.post("/user/register/", data);
export const meApi = ()=>api.get("/user/me/");
export const refreshApi = (refresh) =>
axios.post(`${process.env.REACT_APP_API_URL}/user/refresh/`, { refresh });