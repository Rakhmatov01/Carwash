import Navbar from "../../components/Navbar"
import { useAuthStore } from "../../store/authStore"
export default function UserProfilePage(){
    const user = useAuthStore((s)=>s.user);
    return (<div><Navbar /><p>{user.username}</p></div>)
}