import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react";
import { addCommentApi, getCarwashApi, getCommentApi } from "../../api/carwash";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import RatingBadge from "../../components/carwash/RatingBadge";
import ReadRating from "../../components/carwash/BasicRating";
import { useUiStore } from "../../store/uiStore";
export default function CarwashDetailPage(){
    const token = useAuthStore(s=>s.accessToken);
    const [carwash , setCarwash] = useState(null);
    const openPopup = useUiStore(s=>s.openRatingPopup);
    const [comments , setComments] = useState(null);
    const [usersComment, setUsersComment] =useState("");
    const {id} = useParams();

    function onOpenPopup(){
        if(!token){
            toast.error("You need to login first to give rating!");
            return;
        }
         openPopup(id)
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!token){
          toast.error("You need to login first to comment!");
          return;
        }
        const res = await addCommentApi(id, usersComment);
        const resget = await getCommentApi(id);
        setComments(resget.data);
        setUsersComment('');
    }
    useEffect(()=>{
        async function loadCarwash(){
            try{
            const res = await getCarwashApi(id);
            setCarwash(res.data);
        }catch(err){
                toast.error(err.message);
            }
        } 
        async function loadComments(){
            try{
            const res = await getCommentApi(id);
            setComments(res.data);
        }catch(err){
                toast.error(err.message);
            }
        }
        loadCarwash();
        loadComments();
    },[id])
    return(<div>
        <Navbar />
    <div className="mx-auto  px-10">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* LEFT: page bilan birga scroll bo‘ladi */}
        <main className="flex-1 my-6 bg-white rounded-xl shadow-md">
          <img src={carwash?.image} alt={carwash?.name} className="w-full h-[320px] object-cover rounded-t-xl"/>
          <div className="p-5 flex justify-between" >
            <div>
            <div className="flex gap-3 mb-2">
        <h1 className="text-2xl font-bold mb-2">{carwash?.name}</h1>
        <RatingBadge value={carwash?.rating_avg} carwashId={id} />
        </div>
        <h3 className="text-gray-600 text-xl mb-2">{carwash?.address}</h3>
        </div>
        <div className="mt-3 hover:cursor-pointer" onClick={onOpenPopup}>
          <ReadRating />
        </div>
    </div>
        </main>

        {/* RIGHT: joyida turadi, ichida scroll */}
       <aside className="w-[500px] shrink-0 mt-6">
  <div className="sticky top-6">
    <div className="h-[calc(100vh-6rem)] bg-white border rounded-xl shadow-md flex flex-col">

      <h1 className="text-2xl font-bold p-4 border-b">
        Comments
      </h1>

      <div className="flex-1 overflow-y-auto p-4">
        {comments && comments.map((c,i)=><CommentBox key={i} data={c} />)}
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
        <input
        value={usersComment}
        onChange={(e)=>setUsersComment(e.target.value)}
          type="text"
          placeholder="Write a comment..."
          className="ml-4 w-full  rounded-l-lg  focus:outline-none "
        />
        <button className=" text-white p-3 bg-blue-500 rounded-r-lg">Send</button>
      </form>
      </div>

    </div>
  </div>
</aside>
      </div>
    </div>
        </div>)
    
}

function CommentBox({data}){
    return(<div className="border rounded-lg border-gray-200 mb-4" >
        <p className="ml-2 text-gray-400">{data.username}</p>
        <h2 className="mx-4 text-lg font-medium">{data.text}</h2>
    </div>)
}