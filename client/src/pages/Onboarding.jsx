import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import axios from "axios"

export default function Onboarding() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({"techStack":[]});
  const [techStack, setTechStack] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [tag, settag] = useState("Tags")
  const tagRef = useRef()
  const descRef = useRef()
  const techs=["ReactJS","ExpressJS","Nodejs","MongoDB","Python","Javascript","TailwindCSS"]
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    },
    withCredentials: true, credentials: 'include'
};

  const techStackAdder=(e)=>{
    if(!(formData.techStack).includes(e.target.value)){
      (formData.techStack).push(e.target.value)
      e.target.className="rounded-md border px-2 border-dashed border-black bg-green-400";
    }else{
      (formData.techStack).splice((formData.techStack).indexOf(e.target.value),1)
      e.target.className="rounded-md border px-2 border-dashed border-black bg-white";
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("--------");
      console.log(formData);
      dispatch(updateUserStart());
      // const res = await fetch(`http://localhost:3000/api/user/onboard/${currentUser._id}`, {
      const res = await fetch(`https://flexfordev.onrender.com/api/user/onboard/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials:"include"
      });
      // let res=await axios.post(`http://localhost:3000/api/user/onboard/${currentUser._id}`,JSON.stringify(formData),customConfig)
      const data =await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      navigate("/")
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }
  return (
    <div className='w-[100%] flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='p-6 border border-black border-dashed items-center flex w-[50%] flex-col gap-4'>
        <div className='flex justify-between items-center w-[60%]'>
          <span>First Name</span>
          <input
            type='text'
            placeholder='Enter your First Name'
            id='firstName'
            className='w-[70%] border border-black border-dashed bg-white placeholder:text-black p-2 rounded-lg'
            onChange={handleChange}
          />
        </div>

        <div className='flex justify-between items-center w-[60%]'>
          <span>
            Last Name
          </span>
          <input
            type='text'
            placeholder='Enter your Last Name'
            id='lastName'
            className='w-[70%] border border-black border-dashed bg-white placeholder:text-black p-2 rounded-lg'
            onChange={handleChange}
          />
        </div>
        <div className=' flex justify-between items-center w-[60%]'>
          <span>
            Select your Flex-Tag
          </span>
          <select onChange={handleChange} id="tags" ref={tagRef} className='border border-black border-dashed bg-white placeholder:text-black p-2 rounded-lg'>
            <option value="" disabled selected hidden>{tag}</option>
            <option value="AI Aficionado
" onClick={() => { settag("AI Aficionado") }}>AI Aficionado</option>
            <option value="Full-Stack Magician" onClick={() => { settag("Full-Stack Magician") }}>Full-Stack Magician</option>
            <option value="React Rockstar" onClick={() => { settag("React Rockstar") }}>React Rockstar</option>
            <option value="Python Pro" onClick={() => { settag("Python Pro") }}>Python Pro</option>
            <option value="UI/UX Unicorn" onClick={() => { settag("UI/UX Unicorn") }}>UI/UX Unicorn</option>
            <option value="App Developer" onClick={() => { settag("App Developer") }}>App Developer</option>
            <option value="Competitive Coder" onClick={() => { settag("Competitive Coder") }}>Competitive Coder</option>
          </select>
        </div>
        <div className='flex justify-between items-center w-[60%]'>
          <span>
            Bio
          </span>
          <textarea id="description" onChange={handleChange} ref={descRef} type='text' className='w-[70%] resize-none aspect-video text-wrap border border-black border-dashed bg-white placeholder:text-black p-2 rounded-lg' maxLength={100} placeholder='Describe yourself in 100 characters.' />
        </div>
        <div className='flex justify-between items-center w-[60%]'>
          <span>
            Choose Tech Stack
          </span>
          <div className='w-[50%] flex flex-wrap gap-1'>
            {techs.map((tech)=>{
              return(
<button key={tech} value={tech} onClick={(e)=>{techStackAdder(e)}} type='button' className={`rounded-md border px-2 border-dashed border-black`}>
              {tech}
            </button>
              )
            })}
          </div>
        </div>

        <button
          disabled={loading}
          className='w-[20%] bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
