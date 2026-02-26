import { useState } from "react";
import LoginPageLayout from "../../components/layout/LoginPageLayout";
import { registerApi } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
  async function handleForm(e) {
    try {
      e.preventDefault();
      const data = { username, email, password, role };
      const response = await registerApi(data);

      toast.success("Account created ✅");

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");

      setTimeout(() => navigate("/login", { replace: true }), 300);

    } catch (err) {
  const status = err?.response?.status;

  if (status === 400) {
    toast.error("Register failed ❌");
    return;
  }

  toast.error("Something went wrong!");
  console.error(err);
}
  }
  const boxStyle =
    "mt-5 px-3 py-2 border-[2px] border-gray-300 focus:border-blue-500 focus:outline-none rounded-xl";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  return (
    <>
      <LoginPageLayout title={"register"} onClick={handleForm}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          type="text"
          className={boxStyle}
        ></input>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          className={boxStyle}
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className={boxStyle}
        ></input>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-5 w-full px-3 py-2 cursor-pointer
             border border-gray-300 
             rounded-lg 
             bg-white 
             text-gray-700
             focus:outline-none 
             focus:ring-2 
             focus:ring-blue-400 
             focus:border-blue-500
             transition duration-200"
        >
          <option value="user">user</option>
          <option value="partner">partner</option>
        </select>
      </LoginPageLayout>
    </>
  );
}
