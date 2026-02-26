
export default function CarwashCard({data}){
    console.log(data)
return <div className="w-full h-80 border rounded-xl shadow-md bg-white"><div className="w-full h-52 ">
    <img src={data.image} alt={data.name} className="object-fill w-full h-full  rounded-t-xl"/>
    <div className="p-5" >
        <h1 className="text-2xl font-bold mb-3">{data.name}</h1>
        <h3 className="text-gray-600 text-xl">{data.address}</h3>
    </div>
</div></div>
}