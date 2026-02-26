import { useEffect, useState } from "react";
import CarwashList from "../../components/CarwashList";
import Navbar from "../../components/Navbar";
import { getCarwashesApi } from "../../api/carwash";
import toast from "react-hot-toast";

export default function HomePage(){
    const [carwashList, setCarwashList] = useState([]);
    useEffect(()=>{
        try{
        async function loadCarwashList(){
            const res = await getCarwashesApi();
            setCarwashList(res.data);
        }
        loadCarwashList();
    }catch(err){
            toast.error("failed to load list");
        }
    },[]);
    return (<div><Navbar /><CarwashList data={carwashList}/></div>)
}