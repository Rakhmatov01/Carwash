import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function RoleRoute({role, children}){
    const user = useAuthStore((s)=>s.user);
    if(!user) return null;
    if(user.role!==role){
        return (<Navigate to="/" replace />);
    }
    return children;
    
}