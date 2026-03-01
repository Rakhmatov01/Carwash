import { useNavigate } from "react-router-dom";
import ReadRating from "./BasicRating";
import RatingBadge from "./RatingBadge";
import { useUiStore } from "../../store/uiStore";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";


export default function CarwashCard({data}){
    const user = useAuthStore(s=>s.user);
    const openPopup = useUiStore(s=>s.openRatingPopup);
    const navigate = useNavigate();
    function onOpenPopup(e){
        e.stopPropagation();
        if(!user){
            toast.error("You need to login first to give rating!");
            return;
        }
         openPopup(data.id)
    }
    console.log(data);
    function handleClick(){
        navigate(`/carwash/${data.id}`);
    }
    const formatted = new Date(data.created_at).toLocaleDateString("en-GB").replaceAll("/" , ".");
return (
  <div
  onClick={handleClick}
    className="w-full group h-[350px] border rounded-xl shadow-md bg-white hover:cursor-pointer overflow-hidden"
  >
    {/* image */}
    <div className="w-full h-52">
      <img
        src={data.image}
        alt={data.name}
        className="transition-transform duration-300 ease-out object-cover w-full h-full rounded-t-xl group-hover:scale-110"
      />
    </div>

    {/* content */}
    <div className="p-5 flex justify-between">
        <div>
      <div className="flex gap-3 mb-2">
        <h1 className="text-2xl font-bold ">{data.name}</h1>
        <RatingBadge value={data.rating_avg} carwashId={data.id} />
      </div>
      <h3 className="text-gray-600 text-xl mb-2">{data.address}</h3>
      <p>
        <span>Created at:</span> {formatted}
      </p>
    </div>
      <div className="mt-3 z-30" onClick={(e)=>onOpenPopup(e)}>
        <ReadRating />
      </div>
    </div>
  </div>
);
}