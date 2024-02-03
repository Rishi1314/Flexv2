import { useEffect, useState } from "react";
import axios from "axios"

export default function Home() {
  const [users,setUsers]=useState("")
  const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    },
    withCredentials: true, credentials: 'include'
};
  useEffect(() => {
    const loader = async () => {
      let res=await axios.post("http://localhost:3000/api/user/getUsers",JSON.stringify({}),customConfig)
      setUsers(res.data);
    }
    loader();
    
  }, [])
  
  
  return (
    <div className='w-[100%] flex bg-[#141619] h-[93vh]'>
      
      <div className="text-white p-6">
        Still under development
      </div>
    </div>
  );
}