import api from './axios';

export const loginApi = (data)=>api.post("/user/login/", data);
export const registerApi = (data)=>api.post("/user/register/", data);
export const meApi = ()=>api.get("/user/me/");
export const refreshApi = (refresh) => api.post("user/refresh/", {refresh});