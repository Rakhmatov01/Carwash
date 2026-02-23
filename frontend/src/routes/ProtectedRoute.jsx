import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({children}){
    const token = useAuthStore((s)=>s.accessToken);
    const location =useLocation();

    if(!token){
        return (
            <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace/>
        )
    }

    return children;
}