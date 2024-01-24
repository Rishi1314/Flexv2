import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import axios from "axios"
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function Signup() {
    const [formData,setFormData]=useState({})
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(null)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const customConfig = {
      headers: {
      'Content-Type': 'application/json'
      }
  };
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        setLoading(true)
        setError(false);
        dispatch(signInStart());
        let res=await axios.post("https://flexfordev.onrender.com/api/auth/signup",JSON.stringify(formData),customConfig)
        let res2=await axios.post("https://flexfordev.onrender.com/api/auth/signin",JSON.stringify(formData),customConfig)
        // const res= await fetch('/api/auth/signup',{
        //   method:'POST',
        //   headers:{
        //     'Content-Type':'application/json'
        //   },
        //   body:JSON.stringify(formData)
        // });
        const data=res.data;
        const data2=res2.data;
        setLoading(false);
        if(data.success===false){
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
    <div className=" bg-[url('./assets/sign.jpg')] bg-center bg-cover bg-no-repeat flex justify-center items-center min-h-screen w-[100%]">
      <div className='p-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 w-[35%] max-[767px]:w-[100%]'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create a new account</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Enter Username'
          id='username'
          className='border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Enter Email'
          id='email'
          className='border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Enter Password'
          id='password'
          className='border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?"Loading":'Sign Up'}
        </button>
        <hr/>
        <OAuth/>
      </form>
      <div className='justify-center flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Log In</span>
        </Link>
      </div>
      <div className='flex justify-center'>
      <p className='text-red-700 mt-5'>{error&&"Something went Wrong"}</p>

      </div>
    </div>
    </div>
    
  )
}
