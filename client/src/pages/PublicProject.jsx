import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteProjectStart,
  deleteProjectFailure,
  deleteProjectSuccess,
} from "../redux/user/userSlice";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PublicProject() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [projectData, setprojectData] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [imagePercentage, setImagePercentage] = useState(0);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ userId: currentUser._id });
  const navigate = useNavigate();
  const techColors = {
    ReactJS: "82CD47",
    ExpressJS: "3C3633",
    Nodejs: "527853",
    NodeJS: "527853",
    MongoDB: "3A4D39",
    Python: "FFE382",
    Java: "FFA33C",
    Javascript: "FFA33C",
    TailwindCSS: "40A2D8",
    Flutter: "36BAF6",
    HTML: "E5532D",
    CSS: "2D53E5",
    C: "085D9F",
    Cpp: "085D9F",
    MySQL: "F29418",
    Firebase: "F5831E",
  };
  const { projectId} = useParams();
    const customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
    useEffect(() => {
        // let id="65bb8256cb5b7e7f0a78c31a"
        // if (!projectData) {
        //     const temp = async () => {
        //         let res = await axios.post(
        //             `/api/user/getPublicProject/${id}`,
        //             JSON.stringify({}),
        //             customConfig
        //         );   
        //         setprojectData(res.data[0])
        //         // console.log(res.data[0]);
                
        //     }
        //   temp()
      const loader = async () => {
        // console.log(post);
        
        try {
              console.log(projectId);
              
              let res = await axios.post(
                `/api/user/getPublicProject/${projectId}`,
                      JSON.stringify({}),
                customConfig
              );
              setprojectData(res.data[0]);
              console.log(projectData);
            } catch (err) {
              console.log(err.response.data);
              
            }
            
            
          };
          loader();
        
    //   setprojectData(project);
    //   console.log(project);
    // }
    // if (image) {
    //   handleFileUpload(image);
    // }
  }, [projectId]);

  const params = useParams();

  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },

      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, projectPicture: downloadUrl });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/updateProject/${projectData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        // withCredentials:true
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate("/projects");
      }, 5000);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  

  if (projectData) {
    return (
      <div
        className="h-[93vh] overflow-y-auto
        
    bg-[#1E1F24] w-[100%] flex flex-col justify-center items-center  gap-2"
      >
        <div className="bg-[#141619]  h-[90vh] overflow-y-hidden  w-[98%] rounded-2xl p-2 ">
          <form
            onSubmit={handleSubmit}
            className="flex h-[90vh] overflow-y-auto max-[767px]:flex-col max-[767px]:gap-1 gap-4 justify-center p-2 items-center "
          >
            <div
              className="flex min-[768px]:bg-[#24252a8c] rounded-2xl flex-col w-[48%] max-[767px]:items-center max-[767px]:w-[100%] gap-2 p-4
                    justify-center  items-center "
            >
              <div className="flex flex-col gap-2 items-center">
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  src={formData.projectPicture || projectData.projectPicture}
                  alt="profile"
                  className=" w-[300px] h-[200px]
                                max-[767px]:w-[150px] max-[767px]:h-[100px] 
                                cursor-pointer rounded-md object-cover"
                  onClick={() => fileRef.current.click()}
                />

                <p className="text-sm  ">
                  {imageError ? (
                    <span className="text-red-700">
                      Error uploading image (file size must be less than 2 MB)
                    </span>
                  ) : imagePercentage > 0 && imagePercentage < 100 ? (
                    <span className="text-slate-700">{`Uploading: ${imagePercentage} %`}</span>
                  ) : imagePercentage === 100 ? (
                    <span className="text-green-700">
                      Image uploaded successfully
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className="w-[100%] text-center text-white">
                <div className="">
                  Created on:{projectData.date.slice(0, 10)}
                </div>
                <div>Updated on:{projectData.date.slice(0, 10)}</div>
              </div>
              {/* <button
                disabled={Object.keys(formData).length === 1}
                className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition    p-3 uppercase hover:opacity-95 max-[767px]:w-[80%] disabled:hover:border-[#3e3e3e]  disabled:opacity-50 w-[50%] "
              >
                {loading ? "Loading.." : "Update"}
              </button> */}
              <div
                className={` max-w-[50%] max-[767px]:max-w-[80%] w-fit flex bg-[#2f3035] p-3 rounded-xl gap-2 justify-center flex-wrap`}
              >
                {projectData.techStack.map((tech) => {
                  let tagCol = tech.split(" ").join("");
                  return (
                    <span
                      style={{ backgroundColor: `#${techColors[tagCol]}` }}
                      className={` w-fit h-fit p-2 rounded-2xl text-white`}
                      key={tech}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
              {/* <div className=" bg-[#ff5b5b] font-mukta rounded-lg border-white border-2 hover:bg-red-600 duration-200 max-[767px]:w-[80%] text-center cursor-pointer p-2">
                <span className="text-white" onClick={handleDeleteProject}>
                  Delete Project
                </span>
              </div> */}
              {/* <p
                className={`bg-red-700 mt-1 text-white w-[80%] text-center p-2 rounded-md border-white border-2 font-lexend ${
                  !error ? "hidden" : ""
                }`}
              >
                {error && "Something went wrong!"}
              </p>
              <p
                className={`bg-green-700 mt-1 text-white w-[80%] text-center p-2 rounded-md border-white border-2 ${
                  updateSuccess ? "" : "hidden"
                } font-lexend`}
              >
                {updateSuccess && "Project is updated successfully!"}
              </p> */}
            </div>
            <div className="w-[48%] max-[767px]:w-[95%] flex items-center gap-2 flex-col">
              <div className="w-[100%] flex justify-center">
                {/* <input
                  defaultValue={projectData.projectName}
                  type="text"
                  id="projectName"
                  placeholder="Username"
                  className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%]  "
                  onChange={handleChange}
                            /> */}
                            <span className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%]"
                  >
                                {projectData.projectName}
                            </span>
              </div>
              <div className="w-[100%] flex gap-2 items-center flex-col">
                {/* <input
                  defaultValue={projectData.deployLink}
                  type="text"
                  id="deployLink"
                  placeholder="Deploy Link"
                  className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%]"
                  onChange={handleChange}
                            /> */}
                            <span className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%]"
                  >
                                {projectData.deployLink?(projectData.deployLink):'Not Deployed.'}
                            </span>
                            <span className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%]"
                  >
                                {projectData.githubLink?(projectData.githubLink):'No GitHub respositry.'}
                            </span>
                {/* <input
                  defaultValue={projectData.githubLink}
                  type="text"
                  id="githubLink"
                  placeholder="Github Link"
                  className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%]"
                  onChange={handleChange}
                /> */}
                {/* <textarea
                  id="description"
                  onChange={handleChange}
                  type="text"
                  defaultValue={projectData.description}
                  className="  h-[5em] bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%] resize-none text-wrap"
                  maxLength={500}
                  placeholder="Describe project in 100 characters."
                            /> */}
                            <div className="  h-[5em] bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-[50%] max-[767px]:w-[100%] resize-none text-wrap"
                  >
{projectData.description}
                            </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
