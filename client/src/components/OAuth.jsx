import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import {app} from "../firebase"
import {useDispatch} from "react-redux"
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function OAuth() {
    const dispatch=useDispatch();
    const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        },
        withCredentials: true, credentials: 'include'
    };
    const navigate= useNavigate()
    const handleGoogleClick=async()=>{
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app)
            const result=await signInWithPopup(auth,provider)
            let res=await axios.post("https://flexfordev.onrender.com/api/auth/google",
            // let res=await axios.post("http://localhost:3000/api/auth/google",
            JSON.stringify({
                name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
            }),
            customConfig)
            // const res=await fetch('/api/auth/google',{
            //     method:'POST',
            //     headers:{
            //         'Content-Type':'application/json',
            //     },
            //     body:JSON.stringify({
            //         name:result.user.displayName,
            //         email:result.user.email,
            //         photo:result.user.photoURL
            //     })
            // })
            const data=res.data;
            console.log(data);
            dispatch(signInSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("Couldnt log in with Google",error);
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick}
     className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with Google</button>
  )
}
