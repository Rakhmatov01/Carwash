import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"
import { useAuthStore } from "../../store/authStore"
import toast from "react-hot-toast";
export default function UserProfilePage(){
    const logout = useAuthStore(s=>s.logout);
    const user = useAuthStore((s)=>s.user);
    const navigate = useNavigate();
    function handleLogout(){
        const ok = window.confirm("Are you sure to log out?");
        if(!ok) return;
        toast.success("you logged out");
        logout();
        navigate('/');
    }
    if(!user) return;
    console.log(user);    

    return (<div className="min-h-screen flex flex-col"><Navbar />
    <div className=" flex-1  flex justify-center items-center">
        <div className="w-96 bg-white shadow-md rounded-xl p-8 flex flex-col gap-6">

  <div>
    <h2 className="text-2xl font-semibold text-gray-800">
      Profile
    </h2>
    <p className="text-sm text-gray-400">
      Account information
    </p>
  </div>

  <div className="space-y-3">
    <p className="text-gray-600">
      <span className="font-medium text-gray-800">Username:</span>{" "}
      {user.username}
    </p>

    <p className="text-gray-600">
      <span className="font-medium text-gray-800">Role:</span>{" "}
      {user.role}
    </p>
  </div>

  <div className="flex justify-end">
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-md text-sm font-medium active:scale-95">
      Logout
    </button>
  </div>

</div>
    </div>
    </div>)
}