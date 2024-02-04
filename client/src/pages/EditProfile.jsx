import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,

  signOut,
} from '../redux/user/userSlice';
import axios from "axios"

export default function EditProfile() {
  const fileRef = useRef(null)
  const dispatch = useDispatch()
  const [image, setImage] = useState(undefined)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [imageError, setImageError] = useState(false)
  const [imagePercentage, setImagePercentage] = useState(0)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image])

  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress))
      },

      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePicture: downloadUrl })
        })
      }
    );

  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      // const res = await fetch(`https://flexfordev.onrender.com/api/user/update/${currentUser._id}`, {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
        // withCredentials:true
      });
      // let res=await axios.post(`http://localhost:3000/api/user/update/${currentUser._id}`,JSON.stringify(formData),customConfig)

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccout = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }
  const handleSignOut = async () => {
    try {
      // await axios.get('http://localhost:3000/api/auth/signout');
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-[93vh] overflow-y-auto
        
    bg-[#1E1F24] w-[100%] flex flex-col  p-5 gap-2'>
        <div className='bg-[#141619] p-6 h-[90vh] rounded-2xl'>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex max-[767px]:flex-col  items-center gap-2 justify-between'>
            <div className='flex max-[767px]:flex-col gap-2 items-center'>
            <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt='profile'
            className='bg-[#ffffffb0] p-1 h-24 w-24  cursor-pointer rounded-full object-cover mt-2 '
            onClick={() => fileRef.current.click()}
          />
          <p className='text-sm  '>
            {imageError ? (
              <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercentage} %`}</span>
            ) : imagePercentage === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (
              ''
            )}
          </p>
            </div>
            
            <button className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition    p-3 uppercase hover:opacity-95 disabled:opacity-80 w-[10%] max-[767px]:w-[100%]' >{loading ? "Loading.." : "Update"}</button>
          </div>
          <div className='w-[100%] flex justify-center gap-2 max-[767px]:flex-col'>
          
          <input
            defaultValue={currentUser.username}
            type='text'
            id='username'
            placeholder='Username'
            className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[20%] max-[767px]:w-[100%]  '
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.firstName}
            type='text'
            id='lastName'
            placeholder='lastName'
            className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[20%] max-[767px]:w-[100%]  '
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.lastName}
            type='text'
            id='lastName'
            placeholder='lastName'
            className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[20%] max-[767px]:w-[100%]  '
            onChange={handleChange}
          />
          </div>
          <div className='w-[100%] flex gap-2 justify-center max-[767px]:flex-col'>
          <input
            disabled={true}
            defaultValue={currentUser.email}
            type='email'
            id='email'
            placeholder='Email'
            className='opacity-50 bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base  cursor-pointer transition w-[20%] max-[767px]:w-[100%]'
            onChange={handleChange}
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[20%] max-[767px]:w-[100%]'
            onChange={handleChange}
          />
          </div>
          
          
        </form>
        <div className="flex justify-center gap-4  w-[100%] max-[767px]:justify-between">
          <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccout}>Delete Account</span>
          <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
        <p className='text-green-700 mt-5'>
          {updateSuccess && 'User is updated successfully!'}
        </p>
      </div>
    </div>
  );
}