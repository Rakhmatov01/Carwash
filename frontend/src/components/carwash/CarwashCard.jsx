import { useNavigate } from "react-router-dom";

export default function CarwashCard({data}){
    console.log(data);
    const navigate = useNavigate();
    function handleClick(){
        navigate(`/carwash/${data.id}`);
    }
    const formatted = new Date(data.created_at).toLocaleDateString("en-GB").replaceAll("/" , ".");
return <div onClick={handleClick} className="w-full group h-[350px] border rounded-xl shadow-md bg-white hover:cursor-pointer overflow-hidden"><div className="w-full h-52 ">
    <img src={data.image} alt={data.name} className="transition-transform duration-300 ease-out object-cover w-full h-full  rounded-t-xl group-hover:scale-110"/>
    <div className="p-5" >
        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
        <h3 className="text-gray-600 text-xl mb-2">{data.address}</h3>
        <p><span>Created at:</span>{" "}{formatted}</p>
    </div>
</div></div>
}