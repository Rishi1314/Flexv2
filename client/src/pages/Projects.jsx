import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { app } from '../firebase';

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

      currentUser.projects = [...currentUser.projects, data]
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
      // const result=await fetch(`http://localhost:3000/api/user/getProject/${currentUser._id}`, {
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
  console.log(currentUser);
  return (
    <div className='dashboardParent min-h-screen overflow-y-auto
         w-[100%] p-5'>

      <div className={`${show ? "" : "hidden"} bg-white dashboardChild  w-[400px] rounded-[30px]
          border border-black
           border-dashed overflow-hidden`}>
        <form name='projectForm' onSubmit={handleSubmit} className={`   h-[400px] flex flex-col items-center rounded-[30px] p-4 gap-2 overflow-y-scroll`}>
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
      <button onClick={() => { setShow(!show) }} className='absolute right-10 border-2 p-2 rounded-[10px] border-black border-dashed '>Add Project</button>
      <div className='w-[100%] gap-2 flex flex-wrap'>
        {
          (projects).map((project) => {
            return (<div className=' flex justify-center gap-2 flex-col items-center w-[400px] h-[300px] border-dashed border-black border ' key={project.id}>
              <img src={project.projectPicture } alt="Project Picture" className='w-[300px] h-[200px] object-cover border border-dashed border-black rounded-md' />
              <div>{project.projectName}</div>
              <div className='w-[80%] flex justify-around'>
                {project.deployLink?<a href={project.deployLink} className=' bg-sky-600 text-white px-2 w-[100px] text-center rounded-md'>Live</a>:""}
                {project.githubLink?<a href={project.githubLink} className=' bg-orange-500 text-white px-2 w-[100px] text-center rounded-md '>Github</a>:""}
              </div>
            </div>)
          })
        }
      </div>
    </div>
  )
}

export default Projects