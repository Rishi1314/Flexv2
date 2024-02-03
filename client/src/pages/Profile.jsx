import React, { useEffect, useState } from 'react'
import { FaGithub, FaLink } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const tagColors = { AIAficionado:"424769",CompetitiveCoder:"005B41",FullStackMagician:"7D7C7C",PythonPro:"FFE382",UIUXUnicorn:"711DB0",AppDeveloper:"0079FF",WebDeveloper: "00A9FF", Creator: "FD8D14", ReactRockstar: "82CD47" }

    const techColors = { ReactJS: "82CD47", ExpressJS: "3C3633", Nodejs: "527853", MongoDB: "3A4D39", Python: "FFE382", Javascript: "FFA33C", TailwindCSS: "40A2D8", Flutter: "36BAF6", HTML: 'E5532D', CSS: "2D53E5", C: '085D9F', Cpp: '085D9F', MySQL: "F29418", Firebase:"F5831E" }
    const [projects, setProjects] = useState(currentUser.projects)

    useEffect(() => {
       
        const gettingProjects = async () => {
            const result = await fetch(`/api/user/getProject/${currentUser._id}`, {
                // const result=await fetch(`https://flexfordev.onrender.com/api/user/getProject/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });
            const data = await result.json()
            setProjects(data)

        }
        gettingProjects()
    }, [])

    return (
        <div className='h-[93vh] overflow-y-auto
        
        bg-[#141619] w-[100%] flex flex-col  items-center p-5 gap-2'>
            <div className='flex max-[767px]:flex-col gap-2 w-[100%]'>
                {/* <div className='h-[350px] shadow-lg ring-1 ring-white/5  gap-2 p-4 flex-col rounded-[30px] bg-[#1E1F24] max-[767px]:justify-between max-[767px]:w-[100%] flex items-center justify-center     w-[30%]'>
                    <div className='  flex flex-col gap-2 items-center'>
                        <img src={currentUser.profilePicture} className='  border-[2px] w-[8rem] rounded-full aspect-square object-cover' alt="" />
                        <div className='text-white flex flex-col'>
                            <span className='max-[767px]:text-[150%] text-3xl underline'>{currentUser.username}</span>
                            <div className='flex justify-evenly'><span className='max-[767px]:text-[100%] text-xl'>{currentUser.firstName}</span>
                                <span className='text-xl max-[767px]:text-[100%] '>{currentUser.lastName}</span></div>

                        </div>
                    </div>
                    <div className='max-[767px]:w-[100%] max-[767px]:min-h-fit bg-white/50 w-[90%]  p-2 rounded-md'>
                        {`" ${currentUser.description}. "`}
                    </div>
                    <Link to={"/editprofile"}>
                        <button className=' max-[767px]:text-[80%] bg-black hover:opacity-80
                  shadow-[0px_4px_16px_rgba(44, 44, 44, 1),_0px_8px_24px_rgba(44, 44, 44, 1),_0px_16px_56px_rgba(44, 44, 44, 1)] text-white py-2 px-4 rounded-xl'>
                            Edit Profile</button>
                    </Link>
                </div> */}
                <div className="group before:hover:scale-95 before:hover:w-[99%] before:hover:h-[350px] before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-[100%] before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0  h-[350px] relative bg-[#1E1F24] flex items-center justify-center flex-col rounded-[30px] overflow-hidden w-[30%]  max-[767px]:w-[100%]">
                    <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-60 group-hover:-translate-x-0  group-hover:-translate-y-10 transition-all duration-500"><img src={currentUser.profilePicture} className='  border-[2px] w-[8rem] rounded-full aspect-square object-cover' alt="" /></div>
                    
  <div className="z-10 w-[90%] group-hover:-translate-y-10 transition-all flex flex-col gap-2 items-center duration-500">
                        <span className=" text-white text-2xl font-semibold">{currentUser.username }</span>
                        <div className='flex justify-evenly text-white w-[100%]'><span className='max-[767px]:text-[100%] text-xl'>{currentUser.firstName}</span>
                            <span className='text-xl max-[767px]:text-[100%] '>{currentUser.lastName}</span></div>
                            <div className='max-[767px]:w-[100%] max-[767px]:min-h-fit bg-white/50 w-[90%]  p-2 rounded-md'>
                        {`" ${currentUser.description}. "`}
                        </div>
                        <Link to={"/editprofile"}>
                        <button className=' max-[767px]:text-[80%] bg-black hover:opacity-80
                  shadow-[0px_4px_16px_rgba(44, 44, 44, 1),_0px_8px_24px_rgba(44, 44, 44, 1),_0px_16px_56px_rgba(44, 44, 44, 1)] text-white py-2 px-4 rounded-xl'>
                            Edit Profile</button>
                    </Link>
                    </div>
                    
  
</div>
                <div className='shadow-lg ring-1 ring-white/5 p-4 rounded-[30px] bg-[#1E1F24] flex-col max-[767px]:w-[100%] flex h-[350px]  w-[70%] gap-2  '>


                    <div className=' max-[767px]: projectsCardProfile p-2 flex gap-2 w-[100%] h-[350px] overflow-x-auto overflow-y-hidden'>
                        {/* <div className="flex  w-[20%] flex-row items-center justify-center">
                            <button className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
                                <span className="block rounded-md bg-slate-900 px-5 py-3 font-bold text-white"> Twitter</span>
                            </button>
                        </div> */}
                        {
                            (projects.length>0) ? (projects).map((project) => {
                                return (<div className='
                                shadow-lg ring-1 ring-black/5  flex justify-center gap-2 flex-col items-center min-w-[300px] h-[300px] rounded-md bg-[#141619] ' key={project.id}>
                                    <img src={project.projectPicture} alt="Project Picture" className='w-[250px] h-[200px] object-cover border border-dashed border-black rounded-md' />
                                    <div className='flex w-[80%] justify-between items-center  '>
                                        <div className='text-white font-lexend'>{project.projectName}</div>
                                        <div className=' font-mukta flex  gap-2'>
                {project.deployLink ? <a target='blank' href={project.deployLink} className='shadow-lg ring-1 ring-black/5 text-white bg-blue-400 text-[20px] hover:bg-blue-500 rounded-full p-2'><FaLink /></a> : ""}
                {project.githubLink ? <a target='blank' href={project.githubLink} className='shadow-lg ring-1 ring-black/5 text-white bg-orange-500 text-[20px] hover:bg-orange-600 rounded-full p-2 '><FaGithub />
</a> : ""}
              </div>
                                    </div>
                                    
                                    
                                </div>)
                            }) : <div className='text-white font-lexend flex justify-center items-center w-[100%] h-[100%]'>Your Projects would have been displayed here if you hand any!</div>
                        }
                    </div>
                </div>
            </div>

            <div className='shadow-lg ring-1 ring-white/5 p-4 w-[100%] rounded-[30px] bg-[#1E1F24]'>
                <div className=' max-[767px]:justify-center max-[767px]:w-[100%] w-[50%] flex flex-wrap gap-2'>
                    {(currentUser.tags).map((tag) => {
                        let tagCol = tag.split(" ").join("").split("-").join("").split("/").join("")
                        return <span style={{ backgroundColor: `#${tagColors[tagCol]}` }} className={` w-fit h-fit p-2 rounded-2xl text-white`} key={tag}>{tag}</span>
                    })}
                </div>
            </div>
            <div className='shadow-lg ring-1 ring-white/5 p-4 w-[100%] rounded-[30px] bg-[#1E1F24]'>
                <div className=' max-[767px]:justify-center max-[767px]:w-[100%] w-[100%] flex flex-wrap gap-2'>
                    {(currentUser.techStack).map((tech) => {
                        let tagCol = tech.split(" ").join("")
                        return <span style={{ backgroundColor: `#${techColors[tagCol]}` }} className={` w-fit h-fit p-2 rounded-2xl text-white`} key={tech}>{tech}</span>
                    })}
                </div>
            </div>

        </div>
    )
}

export default Profile