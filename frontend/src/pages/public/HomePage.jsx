import React, { useEffect, useState } from "react";
import CarwashList from "../../components/CarwashList";
import Navbar from "../../components/Navbar";
import { getCarwashesApi, rateCarwashApi } from "../../api/carwash";
import toast from "react-hot-toast";
import {Search} from "lucide-react";
import RatingPopup from "../../components/carwash/RatingPopup";
import { useUiStore } from "../../store/uiStore";

export default function HomePage(){
    const [carwashList, setCarwashList] = useState([]);
    const carwashId = useUiStore(s=>s.ratingPopup.carwashId);
    const loadCarwashList = React.useCallback( async () =>{
        try{
        const res = await getCarwashesApi();
        setCarwashList(res.data);}
        catch(err){
            toast.error("failed to load list");
        }
    }, [])
    useEffect(()=>{
        loadCarwashList();
    },[loadCarwashList]);
    async function onSubmitRating(rating){
        try{
        const res = await rateCarwashApi(carwashId, rating);
        if(res.ok) toast.success("Rated successfully");
        useUiStore.getState().closeRatingPopup();
        await loadCarwashList();}
        catch{
            toast.error("Rating failed");
        }
    }
    return (<div>
        <Navbar />
        <div className="p-8 md:p-16 md:pt-8">
            <h1 className="text-4xl font-bold text-blue-500 mb-6" >Avtomoykalar</h1>
            <div className="border border-gray-100 bg-white flex items-center gap-2 p-2 mb-6 rounded-md shadow-md w-full   focus-within:border-blue-500">
                <Search className="text-gray-400"/>
                <input className="bg-transparent flex-1 focus:outline-none" type="text" placeholder="Manzil bo'yicha qidirish"/>
            </div>
            <CarwashList data={carwashList}/>
            <RatingPopup
                            open={useUiStore((s) => s.ratingPopup.open)}
                            onClose={() => useUiStore.getState().closeRatingPopup()}
                            onSubmit={onSubmitRating}
                        />
        </div>
        </div>)
}