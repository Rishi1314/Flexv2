import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const Tasks = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tasks, settasks] = useState(currentUser.tasks);
  const date=new Date()
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({ email: currentUser.email });
  const descRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {




      const res = await fetch(`/api/user/addTask/${currentUser._id}`, {
        // const res = await fetch(`https://flexfordev.onrender.com/api/user/addProject/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });





      const data = await res.json()
      console.log(data);
      settasks([...tasks, data])
      setShow(!show)

      setFormData({ email: currentUser.email })
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
      const result = await fetch(`/api/user/getTask/${currentUser._id}`, {
        // const result=await fetch(`https://flexfordev.onrender.com/api/user/getProject/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      const data = await result.json()
      console.log(data);
      settasks(data)

    }
    gettingProjects()

  }, [currentUser.tasks])

  return (
    <div className='dashboardParent min-h-screen
    w-[100%] p-5 flex flex-col gap-2 projectsPage'>
      <div className='w-[100%]'>
        <div className={`${show ? "" : "hidden"} addProjectCard dashboardChild  w-[500px] max-[767px]:w-[90%] rounded-[10px]
          border border-black
           border-dashed overflow-hidden`}>
          <form name='projectForm' onSubmit={handleSubmit} className={`text-white dashboardChildChild   h-[300px] flex flex-col items-center rounded-[10px] p-4 gap-4 overflow-y-scroll`}>
            <span className='font-lexend'>Add Task</span>
            <div className='w-[100%] swift relative'>
              <input
                type='text'
                placeholder='Task Title'
                id='taskName'
                className='
                    w-[100%]
                        addProjectCardInput p-3 '
                onChange={handleChange}
                maxLength={50}
              />
              <span className='input-border'></span>
            </div>
            <div className='w-[100%] swift relative'>
              <input
                type='date'
                id='deadline'
                className='
                    w-[100%]
                        addProjectCardInput p-3 '
                onChange={handleChange}
              />
              <span className='input-border'></span>
            </div>




            <div className='w-[100%] swift relative'>
              <textarea id="description" onChange={handleChange} ref={descRef} type='text' className=' w-[100%] h-[4em] resize-none text-wrap addProjectCardInput p-2' maxLength={500} placeholder='Description' />
              <span className='input-border'></span>
            </div>
            <div className='w-[100%] flex justify-center items-center'>
              <button type='submit' className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                Create Task
              </button>


            </div>
          </form>
        </div>
        <button onClick={() => { setShow(!show) }} className="shadow-lg ring-1 ring-black/5 group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
          Add a Task
        </button>
        <div className='dashboardChildChild w-[100%] h-[80vh] gap-2 flex flex-wrap justify-center  overflow-y-auto p-6'>
          {
            (tasks.length > 0) ? (
              (tasks).map((task) => {
                let what = (task.deadline) === (date.toISOString().split("T")[0])
                console.log((task.deadline),(date.toISOString().split("T")[0]));
                return (<div className={`${(what)?"bg-red-400":""}  projectCard flex p-2 gap-2 flex-col items-center w-[400px] h-[300px] rounded-xl `} key={task.id}>
                  <div className='w-[70%] flex items-center  justify-between  text-white'>
                    <span className='font-lexend  text-[120%] w-[50%] overflow-hidden  '>{task.taskName}</span>
                    <span className={`${((task.status)==="Complete")?"bg-red-500":((task.status)==="Completed")?"bg-green-500":"bg-yellow-3000"} px-2 rounded-lg`}>{task.status}</span>
                    
                  </div>
                  <div className='w-[70%] taskDescCard h-[100%] p-2 underline break-words text-white overflow-y-auto'>
                  {task.description}
                    
                  </div>


                </div>)
              })
            ) : <div className='font-lexend text-gray-600 text-[250%]'>Add a Project!</div>
          }
        </div>


      </div>

    </div>
  )
}

export default Tasks