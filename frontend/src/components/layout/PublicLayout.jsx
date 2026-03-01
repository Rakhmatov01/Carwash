import { Outlet, useNavigate } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import toast from "react-hot-toast";
import { rateCarwashApi } from "../../api/carwash";
import RatingPopup from "../carwash/RatingPopup";

export default function PublicLayout() {
    const navigate = useNavigate();
    const carwashId = useUiStore(s=>s.ratingPopup.carwashId);
    
        async function onSubmitRating(rating){
        try{
        const res = await rateCarwashApi(carwashId, rating);
        if(res.ok) toast.success("Rated successfully");
        useUiStore.getState().closeRatingPopup();
        }
        catch{
            toast.error("Rating failed");
        }
    }

    return (
        <>
            <Outlet />
            <RatingPopup
                            open={useUiStore((s) => s.ratingPopup.open)}
                            onClose={() => useUiStore.getState().closeRatingPopup()}
                            onSubmit={onSubmitRating}
                        />       
        </>
    );
}