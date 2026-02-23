import LoginPageLayout from "../../components/layout/LoginPageLayout";

export default function RegisterPage(){
    const boxStyle ="mt-5 px-3 py-2 border-[2px] border-gray-300 focus:border-blue-500 focus:outline-none rounded-xl";
    return (<LoginPageLayout title={"register"}>
            <input placeholder="username" type="text" className={boxStyle}></input>
            <input type="email" placeholder="email" className={boxStyle}></input>
            <input type="password" placeholder="password" className={boxStyle}></input>
            <select className="mt-5 w-full px-3 py-2 cursor-pointer
             border border-gray-300 
             rounded-lg 
             bg-white 
             text-gray-700
             focus:outline-none 
             focus:ring-2 
             focus:ring-blue-400 
             focus:border-blue-500
             transition duration-200">
                <option value="user">user</option>
                <option value="partner">partner</option>
            </select></LoginPageLayout>
            )
}