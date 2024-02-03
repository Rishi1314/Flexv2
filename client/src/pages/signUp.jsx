import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import axios from "axios"
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const customConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError(false);
      dispatch(signInStart());
      let res = await axios.post("/api/auth/signup", JSON.stringify(formData), customConfig)
      // let res=await axios.post("https://flexfordev.onrender.com/api/auth/signup",JSON.stringify(formData),customConfig)
      let res2 = await axios.post("/api/auth/signin", JSON.stringify(formData), customConfig)
      // let res2=await axios.post("https://flexfordev.onrender.com/api/auth/signin",JSON.stringify(formData),customConfig)
      // const res= await fetch('/api/auth/signup',{
      //   method:'POST',
      //   headers:{
      //     'Content-Type':'application/json'
      //   },
      //   body:JSON.stringify(formData)
      // });
      const data = res.data;
      const data2 = res2.data;
      setLoading(false);
      if (data.success === false) {
        dispatch(signInFailure(data2));
        setError(true);
        return;
      }
      dispatch(signInSuccess(data2));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }

  }
  return (
    <div loading="lazy" className="flex justify-center items-center min-h-screen w-[100%] bg-[#141619]">
      <div className='p-3 text-white addProjectCard dashboardChild   rounded-[10px]
         shadow-lg ring-1 ring-black/5 w-[25%] max-[767px]:w-[90%]'>
        <h1 className='text-3xl text-center font-semibold my-7'>Create a new account</h1>
        <form onSubmit={handleSubmit} className='flex items-center flex-col gap-4'>
          <div className='w-[70%] swift relative'><input
            type='text'
            placeholder='Enter Username'
            id='username'
            className='w-[100%]
          addProjectCardInput p-3'          onChange={handleChange}
          /><span className='input-border'></span></div>
          <div className='w-[70%] swift relative'><input
            type='email'
            placeholder='Enter Email'
            id='email'
            className='w-[100%]
          addProjectCardInput p-3'          onChange={handleChange}
          /><span className='input-border'></span></div>
          <div className='w-[70%] swift relative'><input
            type='password'
            placeholder='Enter Password'
            id='password'
            className='w-[100%]
          addProjectCardInput p-3'          onChange={handleChange}
          /><span className='input-border'></span></div>




          <button disabled={loading} className="button w-[50%] font-lexend">
            <span>
              {loading ? "Loading" : 'Sign Up'}

            </span>
          </button>
          <div className='bg-[#bbb] w-[70%] h-[1px]'></div>
          <OAuth />
        </form>
        <div className='justify-center flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to='/sign-in' className='hover:scale-105 duration-200' >
            <span className='  text-black px-2 rounded-lg font-mukta bg-white'>Sign in</span>
          </Link>
        </div>
        <div className='flex justify-center'>
          <p className='text-red-700 mt-5'>{error && "Something went Wrong"}</p>

        </div>
      </div>
    </div>

  )
}
