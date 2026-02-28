import {useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useLocation } from "react-router-dom";

export default function Navbar(){
    const {pathname} = useLocation();
    const accessToken = useAuthStore((s)=>s.accessToken);
    const navigate = useNavigate();
    return (<div className= " bg-white w-full flex items-center justify-between shadow-md px-5 py-3 ">
        <div className="px-3 py-2"><h2 className="text-2xl">MoykaTop</h2></div>

        <div className="px-3 py-2 flex gap-5 items-center">
            <button className={pathname==="/"? "text-blue-600":`hover:text-blue-500`} onClick={()=>navigate("/")} >Moykalar</button>
            {accessToken ? (
  <button className={pathname==="/profile"? "text-blue-600":`hover:text-blue-500`} onClick={() => navigate("/profile")}>
    Profile
  </button>
) : (
  <div className="flex gap-2">
    <button onClick={() => navigate("/register")} className="hover:text-blue-500">Register</button>
    <span>or</span>
    <button onClick={() => navigate("/login")} className="hover:text-blue-500">Log in</button>
  </div>
)}
        </div>

    </div>)
}