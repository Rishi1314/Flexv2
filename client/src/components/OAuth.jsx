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
            // let res=await axios.post("https://flexfordev.onrender.com/api/auth/google",
            let res=await axios.post("/api/auth/google",
            JSON.stringify({
                name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
            }),
            customConfig)
            
            const data=res.data;
            dispatch(signInSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("Couldnt log in with Google",error);
        }
    }
    return (
        <button onClick={handleGoogleClick}  className="button2 max-[767px]:w-[100%] text-[100%] w-[50%] font-mukta">
        <span className=" py-4">
          Continue with Google

        </span>
      </button>

  )
}
