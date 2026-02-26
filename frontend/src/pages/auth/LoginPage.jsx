import { useState } from "react";
import LoginPageLayout from "../../components/layout/LoginPageLayout";
import { loginApi, meApi } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const setTokens = useAuthStore((s)=>s.setTokens);
    const setUser =useAuthStore((s)=>s.setUser);
    const [username , setUsername]=useState("");
    const [password , setPassword]=useState("");
    const navigate = useNavigate();
    async function onHandleLogin(e){
        try{
            e.preventDefault();
            const res = await loginApi({username, password});
            console.log(res.data);
            setTokens({accessToken:res.data.access , refreshToken:res.data.refresh});
            toast.success("Logged in ✅")
            // set user after log in 
            const resme = await meApi();
            setUser(resme);
            // navigate to user's homepage 
            navigate("/");

        }catch(err){
            toast.error("Username or password is incorrect!")
        }
    }
    const boxStyle ="mt-5 px-3 py-2 border-[2px] border-gray-300 focus:border-blue-500 focus:outline-none rounded-xl";
    return (<LoginPageLayout title={"login"} onClick={onHandleLogin}>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" type="text" className={boxStyle}></input>
            <input value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" className={boxStyle}></input>
           </LoginPageLayout>
            )
}