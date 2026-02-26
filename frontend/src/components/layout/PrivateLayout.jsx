import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { meApi } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";


export default function PrivateLayout() {
    const logout = useAuthStore((s)=>s.logout);
    const setUser = useAuthStore((s)=>s.setUser);
    useEffect(()=>{
        async function loadUser() {
            try{
                const res = await meApi();
                console.log(res);
                setUser(res.data);
            }catch(err){
                logout();
            }

        }
        loadUser();
    },[]);
    // v6 nested routes render here
    return (
        <>
            <Outlet />
        </>
    );
}