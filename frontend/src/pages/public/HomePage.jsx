import { useEffect, useState } from "react";
import CarwashList from "../../components/CarwashList";
import Navbar from "../../components/Navbar";
import { getCarwashesApi } from "../../api/carwash";
import toast from "react-hot-toast";
import {Search} from "lucide-react";

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
    return (<div>
        <Navbar />
        <div className="p-16 pt-8">
            <h1 className="text-4xl font-bold text-blue-500 mb-6" >Avtomoykalar</h1>
            <div className="border border-gray-100 bg-white flex items-center gap-2 p-2 mb-6 rounded-md shadow-md w-full   focus-within:border-blue-500">
                <Search className="text-gray-400"/>
                <input className="bg-transparent flex-1 focus:outline-none" type="text" placeholder="Manzil bo'yicha qidirish"/>
            </div>
            <CarwashList data={carwashList}/>
        </div>
        </div>)
}