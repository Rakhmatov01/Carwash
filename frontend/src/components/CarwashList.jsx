import CarwashCard from "./carwash/CarwashCard";

export default function CarwashList({data}){
    return <div className=" p-16 grid grid-cols-2 gap-5">
        {data.map((carwash, id)=> (<CarwashCard key={id} data={carwash}/>))}
    </div>
}