import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    console.log(currentUser);
    const tagColors={WebDeveloper:"00A9FF",Creator:"FD8D14",ReactRockstar:"82CD47"}
    const techColors={WebDeveloper:"00A9FF",Creator:"FD8D14",ReactJS:"82CD47",ExpressJS:"3C3633",Nodejs:"527853",MongoDB:"3A4D39",Python:"FFE382",Javascript:"FFA33C",TailwindCSS:"40A2D8"}
    return (
        <div className='min-h-screen overflow-y-auto
        
        bg-slate-500 w-[100%] flex flex-col  items-center p-5 gap-6'>
            <div className='max-[767px]:justify-between max-[767px]:w-[100%] flex items-center justify-between w-[100%]'>
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
            <div className='max-[767px]:flex-col max-[767px]:w-[100%] flex justify-between w-[90%] gap-2'>
                <div className='max-[767px]:w-[100%] max-[767px]:min-h-fit bg-white/50 w-[50%]  p-2 rounded-md'>
                    {`" ${currentUser.description}. "`}
                </div>
                <div className=' max-[767px]:justify-center max-[767px]:w-[100%] w-[50%] flex flex-wrap gap-2'>
                {(currentUser.tags).map((tag)=>{
                    let tagCol=tag.split(" ").join("")
                    return <span style={{backgroundColor:`#${tagColors[tagCol]}`}} className={` w-fit h-fit p-2 rounded-2xl text-white`} key={tag}>{tag}</span>
                })}
                </div>
            </div>
            <div>
            <div className=' max-[767px]:justify-center max-[767px]:w-[100%] w-[100%] flex flex-wrap gap-2'>
                {(currentUser.techStack).map((tech)=>{
                    let tagCol=tech.split(" ").join("")
                    return <span style={{backgroundColor:`#${techColors[tagCol]}`}} className={` w-fit h-fit p-2 rounded-2xl text-white`} key={tech}>{tech}</span>
                })}
                </div>
            </div>
            
        </div>
    )
}

export default Profile