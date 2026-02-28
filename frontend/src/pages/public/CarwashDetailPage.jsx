import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useEffect } from "react";
import { getCarwashApi } from "../../api/carwash";
import toast from "react-hot-toast";
export default function CarwashDetailPage(){
    const {id} = useParams();
    try{
    useEffect(()=>{
        async function loadCarwash(){
            const res = await getCarwashApi(id);
            console.log(res);
        } 
        loadCarwash();
    },[])}catch(err){
        toast.error("Failed to load");
    }
    return(<div>
        <Navbar />
    <div className="mx-auto  px-10">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* LEFT: page bilan birga scroll bo‘ladi */}
        <main className="flex-1 py-6">
          <h1 className="text-2xl font-semibold">Left content</h1>

          <div className="mt-6 space-y-3">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="border rounded-xl p-4">
                Left block {i + 1}
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT: joyida turadi, ichida scroll */}
        <aside className="w-[500px] shrink-0">
          <div className="sticky top-6">
            <div className="h-[calc(100vh-3rem)] overflow-y-auto border rounded-xl p-4">
              <h2 className="font-semibold mb-3">Course content</h2>

              <ul className="space-y-2">
                {Array.from({ length: 120 }).map((_, i) => (
                  <li key={i} className="border rounded-lg p-2">
                    Lesson {i + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
        </div>)
    
}