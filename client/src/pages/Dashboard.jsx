import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaCaretLeft } from "react-icons/fa6";
import { BsDisplay, BsBook, BsCodeSquare, BsPen } from "react-icons/bs";

const Dashboard = (props) => {
  const { currentUser } = useSelector((state) => state.user)
  const [first, setfirst] = useState("small")

  if (currentUser) {
    return (
      <div
        className={`max-[767px]:duration-300 max-[767px]:absolute max-[767px]:z-10  relative flex flex-col items-center py-2 bg-slate-950  ${(first === "small") ? "min-[767px]:min-h-screen p-2 w-[50px] max-[767px]:rounded-e-full" : "min-h-screen w-[200px] max-[767px]:w-[100vw]"} duration-200`}>
        <button onClick={() => { (first === "small") ? setfirst("large") : setfirst("small") }} className={` flex items-center justify-center ${(first === "small") ? "m-2  " : " min-[768px]:absolute min-[768px]:-right-5 "} duration-300  border border-black   aspect-square bg-white rounded-lg`}>
          <FaCaretLeft className={` ${(first === "small") ? "" : " rotate-180 "} duration-200 text-[200%] `} />
        </button>
        <Link to={"/profile"}>
          <img src={currentUser.profilePicture} alt="Profile" className={`${(first === "small") ? " hidden" : ""} duration-200 border-black border w-20 aspect-square object-cover rounded-full`} />
        </Link>
        <p className={`${(first === "small") ? "hidden" : ""} w-[90%] text-center text-white text-[100%]`}>
          {`@${currentUser.username}`}
        </p>
        <div className={`${(first === "small") ? " hidden " : ""} w-[80%] bg-slate-50 h-[1px] my-1 duration-300`} ></div>
        <div className={`${(first === "small") ? " max-[767px]:hidden " : ""}  justify-around h-[50vh] w-[80%] items-center flex flex-col gap-4`}>
          <Link to={"/profile"}>
            <div className={`${(first === "small") ? " hover:scale-110 p-2 hover:translate-x-2" : "hidden"} w-[3rem] duration-200 flex hover:bg-slate-800 justify-center items-center gap-1 px-2  text-white cursor-pointer text-2xl rounded-md`}>
              <img src={currentUser.profilePicture} alt="Profile" className={`border-black border w-20 aspect-square object-cover rounded-full`} />

            </div>
          </Link>
          <Link to={"/"}> <div className={`${(first === "small") ? " hover:scale-110 p-2 hover:translate-x-2" : ""} duration-200 flex hover:bg-slate-800 justify-center items-center gap-1 px-2  text-white cursor-pointer text-2xl rounded-md`} onClick={() => { props.func("Feed") }}><BsBook className={``} />
            <span className={`${(first === "small") ? " hidden " : ""}`}>Feed</span></div></Link>
          <Link to={"/"}><div className={`${(first === "small") ? " hover:scale-110 p-2 hover:translate-x-2" : ""} duration-200 hover:bg-slate-800 flex justify-center items-center text-2xl gap-2 px-2  text-white cursor-pointer rounded-md`} onClick={() => { props.func("Projects") }}><BsCodeSquare />
            <span className={`${(first === "small") ? " hidden " : ""}`}>Projects</span>

          </div></Link>
          <Link to={"/"}><div className={`${(first === "small") ? " hover:scale-110 p-2 hover:translate-x-2 " : ""} duration-200 hover:bg-slate-800 flex justify-center items-center text-2xl gap-2 px-2  text-white cursor-pointer rounded-md`} onClick={() => { props.func("Resources") }}><BsDisplay /> <span className={`${(first === "small") ? " hidden " : ""}`}>Resources</span></div></Link>
          <Link to={"/"}> <div className={`${(first === "small") ? " hover:scale-110 p-2 hover:translate-x-2 " : ""} duration-200 hover:bg-slate-800 flex justify-center items-center text-2xl gap-2 px-2  text-white cursor-pointer rounded-md`} onClick={() => { props.func("Snippets") }}><BsPen /> <span className={`${(first === "small") ? " hidden " : ""}`}>Snippets</span></div></Link>




        </div>
      </div>

    )
  } else {


    return (
      <div className={`${currentUser ? "" : "hidden"}`}>
        Dashboard
      </div>


    )
  }
}

export default Dashboard