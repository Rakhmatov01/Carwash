
export default function CarwashCard({data}){
    console.log(data);
    const formatted = new Date(data.created_at).toLocaleDateString("en-GB").replaceAll("/" , ".");
return <div className="w-full h-[350px] border rounded-xl shadow-md bg-white"><div className="w-full h-52 ">
    <img src={data.image} alt={data.name} className="object-fill w-full h-full  rounded-t-xl"/>
    <div className="p-5" >
        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
        <h3 className="text-gray-600 text-xl mb-2">{data.address}</h3>
        <p><span>Created at:</span>{" "}{formatted}</p>
    </div>
</div></div>
}