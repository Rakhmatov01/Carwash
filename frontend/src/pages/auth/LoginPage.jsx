import LoginPageLayout from "../../components/layout/LoginPageLayout";

export default function LoginPage(){
    const boxStyle ="mt-5 px-3 py-2 border-[2px] border-gray-300 focus:border-blue-500 focus:outline-none rounded-xl";
    return (<LoginPageLayout title={"login"}>
            <input placeholder="username" type="text" className={boxStyle}></input>
            <input type="password" placeholder="password" className={boxStyle}></input>
           </LoginPageLayout>
            )
}