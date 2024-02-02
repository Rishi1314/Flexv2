import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { FaGithub, FaLink } from "react-icons/fa6";

const Projects = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const descRef = useRef();
  const fileRef = useRef();
  const [image, setImage] = useState();
  const [projects, setProjects] = useState(currentUser.projects);
  const [show, setShow] = useState(false);
  const [imageError, setImageError] = useState(false)
  const [imagePercentage, setImagePercentage] = useState(0)


  const [formData, setFormData] = useState({ techStack: [], email: currentUser.email });
  const techs = ["ReactJS", "ExpressJS", "NodeJS", "MongoDB", "Python", "Javascript", "TailwindCSS"]

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
          setFormData({ ...formData, projectPicture: downloadUrl })
        })
      }
    );

  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const techStackAdder = (e) => {
    if (!(formData.techStack).includes(e.target.value)) {
      (formData.techStack).push(e.target.value)
      e.target.className = "rounded-md border px-2 border-dashed border-black bg-green-400";
    } else {
      (formData.techStack).splice((formData.techStack).indexOf(e.target.value), 1)
      e.target.className = "rounded-md border px-2 border-dashed border-black bg-white";
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {




      // const res = await fetch(`http://localhost:3000/api/user/addProject/${currentUser._id}`, {
        const res = await fetch(`https://flexfordev.onrender.com/api/user/addProject/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });





      const data = await res.json()

      setProjects([...projects, data])
      setShow(!show)
      setImage(" ")
      setFormData({ techStack: [], email: currentUser.email })
      var frm = document.getElementsByName('projectForm')[0];
      frm.reset()

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const gettingProjects = async () => {
      // const result = await fetch(`http://localhost:3000/api/user/getProject/${currentUser._id}`, {
        const result=await fetch(`https://flexfordev.onrender.com/api/user/getProject/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      const data = await result.json()
      setProjects(data)

    }
    gettingProjects()
    if (image) {
      handleFileUpload(image);
    }
  }, [image, currentUser.projects])

  return (
    <div className='dashboardParent min-h-screen
         w-[100%] p-5 flex flex-col gap-2 bg-[#F9F9FC]'>

      <div className={`${show ? "" : "hidden"} bg-white dashboardChild  w-[400px] rounded-[10px]
          border border-black
           border-dashed overflow-hidden`}>
        <form name='projectForm' onSubmit={handleSubmit} className={` dashboardChildChild   h-[400px] flex flex-col items-center rounded-[10px] p-4 gap-2 overflow-y-scroll`}>
          Add Project
          <div className='w-[100%]'>
            <input
              type='text'
              placeholder='Project Name'
              id='projectName'
              className='
                    w-[100%]
                        border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
              onChange={handleChange}
            />
          </div>
          <div className='w-[100%]  flex items-center justify-center'>
            <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
            <img
              src={formData.projectPicture || "https://firebasestorage.googleapis.com/v0/b/flex-f7f8b.appspot.com/o/1706808363567upload-1118929_640.webp?alt=media&token=e3cb7a8e-8dca-404a-a3bf-ac12db7be1d9"}
              alt='profile'
              className='border border-black border-dashed rounded-2xl p-2 aspect-square w-[60%] self-center cursor-pointer  object-cover mt-2'
              onClick={() => fileRef.current.click()}
            />
            {/* <p className='text-sm self-center'>
            {imageError ? (
              <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercentage} %`}</span>
            ) : imagePercentage === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (
              ''
            )}
          </p> */}
          </div>
          <div className='w-[100%]'>
            <input
              type='url'
              placeholder='Deploy link'
              id='deployLink'
              className='
                        w-[100%] border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
              onChange={handleChange}
            />
          </div>
          <div className='w-[100%]'><input
            type='url'
            placeholder='Github Link'
            id='githubLink'
            className='
                    w-[100%]
                    border border-black border-dashed bg-white placeholder:text-black p-3 rounded-lg'
            onChange={handleChange}
          /></div>


          <div className='w-[100%]'>
            <textarea id="description" onChange={handleChange} ref={descRef} type='text' className=' w-[100%] h-[4em] resize-none text-wrap border border-black border-dashed bg-white placeholder:text-black p-2 rounded-lg' maxLength={100} placeholder='Describe project in 100 characters.' />
          </div>
          <div className='w-[100%] flex flex-col items-center'>
            <span>
              Choose Tech Stack
            </span>
            <div className='w-[100%] justify-center items-center flex flex-wrap gap-1'>
              {techs.map((tech) => {
                return (
                  <button key={tech} value={tech} onClick={(e) => { techStackAdder(e) }} type='button' className={`rounded-md border px-2 border-dashed border-black`}>
                    {tech}
                  </button>
                )
              })}
            </div>
          </div>
          <div className='w-[100%]'>
            <button type='submit' className='w-[100%] bg-red-500 text-white px-2 rounded-md text-2xl'>Submit</button>
          </div>
        </form>
      </div>
      <div className='w-[100%]'><button onClick={() => { setShow(!show) }} className=' 
      shadow-lg ring-1 ring-black/5 hover:bg-[#e9e9e9] duration-300 border-2 p-2 rounded-[10px] font-lexend bg-[#ffffff] '>Add Project</button></div>
      <div className='dashboardChildChild w-[100%] h-[80vh] gap-2 flex flex-wrap justify-center  overflow-y-auto p-6'>
        {
          (projects.length > 0) ? (
            (projects).map((project) => {
              return (<div className='shadow-lg ring-1 ring-black/5 bg-white flex justify-center gap-2 flex-col items-center w-[400px] h-[300px] rounded-xl ' key={project.id}>
                <div className='w-[70%] flex justify-between items-center font-lexend text-[120%]'><div>{project.projectName}</div><div className=' font-mukta flex  gap-2'>
                  {project.deployLink ? <a target='blank' href={project.deployLink} className='shadow-lg ring-1 ring-black/5 text-white bg-blue-400 text-[20px] hover:bg-blue-500 rounded-full p-2'><FaLink /></a> : ""}
                  {project.githubLink ? <a target='blank' href={project.githubLink} className='shadow-lg ring-1 ring-black/5 text-white bg-orange-500 text-[20px] hover:bg-orange-600 rounded-full p-2 '><FaGithub />
  </a> : ""}
                </div></div>
                <img src={project.projectPicture} alt="Project Picture" className='w-[300px] h-[200px] object-cover border border-black rounded-md' />
  
                
              </div>)
            })
          ):<div className='font-lexend text-gray-600 text-[250%]'>Add a Project!</div>
        }
      </div>
    </div>
  )
}

export default Projects