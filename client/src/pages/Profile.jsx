import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    console.log(currentUser);

    return (
        <div className='min-h-screen max-[767px]:absolute bg-slate-500 w-[100%] flex flex-col items-center p-2 gap-6'>
            <div className='max-[767px]:justify-between max-[767px]:w-[100%] flex items-center justify-between w-[50%]'>
                <div className='flex gap-2 items-center'>
                    <img src={currentUser.profilePicture} className='w-[8rem] rounded-full aspect-square object-cover' alt="" />
                    <div className='flex flex-col'>
                        <span className='max-[767px]:text-[150%] text-3xl underline'>{currentUser.username}</span>
                        <span className='max-[767px]:text-[100%] text-xl'>{currentUser.firstName}</span>
                        <span className='text-xl max-[767px]:text-[100%] '>{currentUser.lastName}</span>

                    </div>
                </div>
                <Link to={"/editprofile"}>           
                 <button className='max-[767px]:text-[80%]  
                  hover:bg-zinc-500 bg-zinc-600 text-white py-1 px-2 rounded-xl'>
                    Edit Profile</button>
                </Link>
            </div>
            <div className='max-[767px]:flex-col max-[767px]:w-[100%] flex justify-between w-[50%] gap-2'>
                <div className='max-[767px]:w-[100%] max-[767px]:min-h-fit bg-white/50 w-[50%] min-[768px]:aspect-video p-2 rounded-md'>
                    {`" ${currentUser.description}. "`}
                </div>
                <div className='max-[767px]:w-[100%] w-[50%] flex flex-wrap gap-2'>
                {(currentUser.tags).map((tag)=>{
                    let tagCol=tag.split(" ").join("")
                    console.log(tagCol);
                    return <span className={` bg-${tagCol} w-fit h-fit p-2 rounded-2xl text-white`} key={tag}>{tag}</span>
                })}
                </div>
            </div>
        </div>
    )
}

export default Profile