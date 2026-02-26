import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { meApi } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";


export default function PrivateLayout() {
    const logout = useAuthStore((s)=>s.logout);
    const setUser = useAuthStore((s)=>s.setUser);
    const accessToken = useAuthStore((s)=>s.accessToken);
    useEffect(()=>{
        async function loadUser() {
            try{
                const res = await meApi();
                console.log(res);
                setUser(res.data);
            }catch(err){
                toast.error(err.message);
                logout();
            }

        }
        loadUser();
    },[accessToken,setUser, logout]);
    // v6 nested routes render here
    return (
        <>
            <Outlet />
        </>
    );
}