import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Onboarding() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ techStack: [] });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [tag, settag] = useState("Tags");
  const [verror, setVerror] = useState("");
  const tagRef = useRef();
  const descRef = useRef();
  const techs = [
    "ReactJS",
    "ExpressJS",
    "NodeJS",
    "MongoDB",
    "Python",
    "Javascript",
    "TailwindCSS",
    "Flutter",
    "HTML",
    "CSS",
    "C",
    "Cpp",
    "MySQL",
    "Firebase",
    "Java",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const techStackAdder = (e) => {
    if (!formData.techStack.includes(e.target.value)) {
      formData.techStack.push(e.target.value);
      e.target.className =
        "rounded-md border p-2 hover:scale-105 duration-200 bg-green-400  border-[#818181]";
    } else {
      formData.techStack.splice(formData.techStack.indexOf(e.target.value), 1);
      e.target.className =
        "rounded-md border p-2 hover:scale-105 duration-200 hover:bg-green-400   border-[#818181]";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(formData).length < 5) {
        if (formData.techStack.length === 0) {
          setVerror(`${6 - Object.keys(formData).length} Field(s) Missing`);
        } else {
          setVerror(`${5 - Object.keys(formData).length} Field(s) Missing`);
        }
        return;
      }
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/onboard/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      navigate("/");
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  return (
    <div
      className="dashboardParent h-[93vh]
    w-[100%] p-5 flex flex-col gap-2 bg-black"
    >
      <div
        className={` addProjectCard dashboardChild  w-[90%] max-[767px]:w-[90%] rounded-[10px]
          border border-black
           border-dashed overflow-hidden`}
      >
        <form
          onSubmit={handleSubmit}
          className="text-white dashboardChildChild  flex flex-col items-center rounded-[10px] h-[80vh] p-4 gap-2 overflow-y-scroll"
        >
          <div
            className={`${
              verror ? "text-white bg-red-500 p-2 rounded-md" : " bg-none"
            }`}
          >
            {verror}
          </div>
          <div className="max-[767px]:flex-col flex justify-between items-center w-[60%]">
            <span>First Name</span>
            <input
              type="text"
              placeholder="Enter your First Name"
              id="firstName"
              className="max-[767px]:w-[100%] w-[80%] bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              onChange={handleChange}
            />
          </div>

          <div className="max-[767px]:flex-col flex justify-between items-center w-[60%]">
            <span>Last Name</span>
            <input
              type="text"
              placeholder="Enter your Last Name"
              id="lastName"
              className="max-[767px]:w-[100%] w-[80%] bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              onChange={handleChange}
            />
          </div>
          <div className="max-[767px]:flex-col flex justify-between items-center w-[60%]">
            <span>Select your Flex-Tag</span>
            <select
              onChange={handleChange}
              id="tags"
              ref={tagRef}
              className="w-[60%] bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            >
              <option value="" disabled selected hidden>
                {tag}
              </option>
              <option
                value="AI Aficionado
"
                onClick={() => {
                  settag("AI Aficionado");
                }}
              >
                AI Aficionado
              </option>

              <option
                value="Full-Stack Magician"
                onClick={() => {
                  settag("Full-Stack Magician");
                }}
              >
                Full-Stack Magician
              </option>
              <option
                value="React Rockstar"
                onClick={() => {
                  settag("React Rockstar");
                }}
              >
                React Rockstar
              </option>
              <option
                value="Python Pro"
                onClick={() => {
                  settag("Python Pro");
                }}
              >
                Python Pro
              </option>
              <option
                value="UI/UX Unicorn"
                onClick={() => {
                  settag("UI/UX Unicorn");
                }}
              >
                UI/UX Unicorn
              </option>
              <option
                value="App Developer"
                onClick={() => {
                  settag("App Developer");
                }}
              >
                App Developer
              </option>
              <option
                value="Competitive Coder"
                onClick={() => {
                  settag("Competitive Coder");
                }}
              >
                Competitive Coder
              </option>
            </select>
          </div>
          <div className="max-[767px]:flex-col flex justify-between items-center w-[60%]">
            <span>Enter your Bio</span>
            <textarea
              id="description"
              onChange={handleChange}
              ref={descRef}
              type="text"
              className="max-[767px]:w-[100%] w-[70%] resize-none aspect-video text-wrap bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              maxLength={100}
              placeholder="Describe yourself in 100 characters."
            />
          </div>
          <div className="max-[767px]:w-[100%] max-[767px]:flex-col flex justify-between items-center w-[60%]">
            <span>Choose Tech Stack</span>
            <div className="w-[60%] justify-center items-center flex flex-wrap gap-1">
              {techs.map((tech) => {
                return (
                  <button
                    key={tech}
                    value={tech}
                    onClick={(e) => {
                      techStackAdder(e);
                    }}
                    type="button"
                    className={`rounded-md border p-2 hover:scale-105 duration-200 hover:bg-green-400   border-[#818181]`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* <button
            disabled={loading}
            className='w-[20%] bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            type='submit'
          >
            {loading ? 'Loading...' : 'Submit'}
          </button> */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
