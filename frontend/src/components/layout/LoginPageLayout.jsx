import { useNavigate } from "react-router-dom"
export default function LoginPageLayout({children, title, onClick }){
    const navigate = useNavigate();
    const untitle = title==="register" ? "login" : "register";
    const Title = title[0].toUpperCase()+title.slice(1);
    return (<form onSubmit={onClick}><div className="min-h-dvh flex items-center justify-center px-4 bg-gray-100">
        <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-md flex flex-col">
            <h1 className="text-center text-red-400 text-3xl font-bold">{Title}</h1>
            {children}
            <button type="submit" className="text-white shadow-md text-xl mt-5 px-3 py-2 rounded-xl bg-green-500 active:mt-6 active:shadow-none active:scale-95">{Title}</button>
            <div className="flex justify-center items-center gap-3 mt-5">
                <span>{(title==="register" ? "Already" : "Don't") + " have an account?"}</span>
            <button className="text-blue-400" onClick={()=>navigate(`/${untitle}`)}>{title==="register"? "Log in" : "Register"}</button></div>
        </div>
    </div></form>)
}
