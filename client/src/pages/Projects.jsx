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
  const techs = ["ReactJS", "ExpressJS", "NodeJS", "MongoDB", "Python", "Javascript", "TailwindCSS", "Flutter", "HTML", "CSS", "C", "Cpp", "MySQL", "Firebase", "Java"]

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
      e.target.className = "rounded-md border p-2 hover:scale-105 duration-200 bg-green-400  border-[#818181]";
    } else {
      (formData.techStack).splice((formData.techStack).indexOf(e.target.value), 1)
      e.target.className = "rounded-md border p-2 hover:scale-105 duration-200 hover:bg-none   border-[#818181]";
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {




      const res = await fetch(`/api/user/addProject/${currentUser._id}`, {
        // const res = await fetch(`https://flexfordev.onrender.com/api/user/addProject/${currentUser._id}`, {
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

    function getCookie(key) {
      var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "";
    }
    console.log(getCookie("access_token"))
    const gettingProjects = async () => {
      const result = await fetch(`/api/user/getProject/${currentUser._id}`, {
        // const result=await fetch(`https://flexfordev.onrender.com/api/user/getProject/${currentUser._id}`, {
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
         w-[100%] p-5 flex flex-col gap-2 projectsPage'>

      <div className={`${show ? "" : "hidden"} addProjectCard dashboardChild  w-[500px] max-[767px]:w-[90%] rounded-[10px]
          border border-black
           border-dashed overflow-hidden`}>
        <form name='projectForm' onSubmit={handleSubmit} className={`text-white dashboardChildChild   h-[400px] flex flex-col items-center rounded-[10px] p-4 gap-4 overflow-y-scroll`}>
          <span className='font-lexend'>Add Project</span>
          <div className='w-[100%] swift relative'>
            <input
              type='text'
              placeholder='Project Name'
              id='projectName'
              className='
                    w-[100%]
                        addProjectCardInput p-3 '
              onChange={handleChange}
            />
            <span className='input-border'></span>
          </div>
          <div className='w-[100%]   flex items-center justify-center'>
            <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
            <img
              src={formData.projectPicture || "https://firebasestorage.googleapis.com/v0/b/flex-f7f8b.appspot.com/o/1706808363567upload-1118929_640.webp?alt=media&token=e3cb7a8e-8dca-404a-a3bf-ac12db7be1d9"}
              alt='profile'
              className=' p-2 aspect-square w-[60%] self-center cursor-pointer  object-cover mt-2'
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
          <div className='w-[100%] swift relative'>
            <input
              type='url'
              placeholder='Deploy link'
              id='deployLink'
              className='
                        w-[100%] addProjectCardInput p-3 '
              onChange={handleChange}
            />
            <span className='input-border'></span>
          </div>
          <div className='w-[100%] swift relative'><input
            type='url'
            placeholder='Github Link'
            id='githubLink'
            className='
                    w-[100%]
                    addProjectCardInput p-3'
            onChange={handleChange}
          /><span className='input-border'></span></div>


          <div className='w-[100%] swift relative'>
            <textarea id="description" onChange={handleChange} ref={descRef} type='text' className=' w-[100%] h-[4em] resize-none text-wrap addProjectCardInput p-2' maxLength={500} placeholder='Describe project in 100 characters.' />
            <span className='input-border'></span>
          </div>
          <div className='w-[100%] flex flex-col items-center'>
            <span>
              Choose Tech Stack
            </span>
            <div className='w-[100%] justify-center items-center flex flex-wrap gap-2'>
              {techs.map((tech) => {
                return (
                  <button key={tech} value={tech} onClick={(e) => { techStackAdder(e) }} type='button' className={`rounded-md border p-2 hover:scale-105 duration-200  border-[#818181]`}>
                    {tech}
                  </button>
                )
              })}
            </div>
          </div>
          <div className='w-[100%] flex justify-center items-center'>
            <button type='submit' className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
  Create Project
</button>


          </div>
        </form>
      </div>
      <div className='w-[100%]'>
        
      <button onClick={() => { setShow(!show) }} className="shadow-lg ring-1 ring-black/5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
  Add Project
</button>


      
      </div>
      <div className='dashboardChildChild w-[100%] h-[80vh] gap-2 flex flex-wrap justify-center  overflow-y-auto p-6'>
        {
          (projects.length > 0) ? (
            (projects).map((project) => {
              return (<div className='projectCard flex justify-center gap-2 flex-col items-center w-[400px] h-[300px] rounded-xl ' key={project.id}>
                <div className='w-[70%] flex justify-between items-center font-lexend text-[120%]'><div className='text-white'>{project.projectName}</div><div className=' font-mukta flex  gap-2'>
                  {project.deployLink ? <a target='blank' href={project.deployLink} className='shadow-lg ring-1 ring-black/5 text-white bg-blue-400 text-[20px] hover:bg-blue-500 rounded-full p-2'><FaLink /></a> : ""}
                  {project.githubLink ? <a target='blank' href={project.githubLink} className='shadow-lg ring-1 ring-black/5 text-white bg-orange-500 text-[20px] hover:bg-orange-600 rounded-full p-2 '><FaGithub />
                  </a> : ""}
                </div></div>
                <img src={project.projectPicture} alt="Project Picture" className='w-[300px] h-[200px] object-cover border border-black rounded-md' />


              </div>)
            })
          ) : <div className='font-lexend text-gray-600 text-[250%]'>Add a Project!</div>
        }
      </div>
    </div>
  )
}

export default Projects