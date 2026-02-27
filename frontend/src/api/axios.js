import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const api =axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
api.interceptors.request.use((config)=>{
    const token = useAuthStore.getState().accessToken;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;