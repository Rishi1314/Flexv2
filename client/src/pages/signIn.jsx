import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import axios from "axios"

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      // let res=await axios.post("http://localhost:3000/api/auth/signin",JSON.stringify(formData),customConfig)
      let res=await axios.post("https://flexfordev.onrender.com/api/auth/signin",JSON.stringify(formData),customConfig)
      // let data = await fetch('http://localhost:3000/api/auth/signin', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      const data =await res.data
      // console.log(res);
      if (data.success === false) { 
        dispatch(signInFailure(data.message));
        return;
      }
      // console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.response.data));
    }
  };
  return (
    <div loading="lazy" className="bg-[url('./assets/sign.jpg')] bg-center bg-cover bg-no-repeat flex justify-center items-center min-h-screen w-[100%]">
      <div className='p-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5 w-[35%] max-[767px]:w-[100%]'>
        <h1 className='text-3xl text-center font-semibold my-7'>Log In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            id='email'
            className='border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            className='border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <hr/>
          <OAuth />
        </form>
        <div className='w-[100%] justify-center flex gap-2 mt-5'>
          <p>Dont Have an account?</p>
          <Link to='/sign-up' >
            <span className='text-blue-500'>Sign up</span>
          </Link>
        </div>
        <div className='flex w-[100%] justify-center'>
        <p className='text-red-700 mt-5'>
          {error ? error.message || 'Something went wrong!' : ''}
        </p>
        </div>
      </div>
    </div>

  );
}