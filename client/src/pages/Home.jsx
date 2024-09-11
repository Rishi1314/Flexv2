import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [users, setUsers] = useState(null);
  const [feed, setFeed] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include",
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);

    const loader = async () => {
      let res = await axios.post(
        "/api/user/getUsers",
        JSON.stringify({ filter: inputValue }),
        customConfig
      );
      setUsers(res.data.user);
      let stuff = await axios.post(
        "/api/user/getAllProjects",
        JSON.stringify({}), customConfig

      )
      // console.log(stuff.data);

      stuff.data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
      });
      setFeed(stuff.data);

    };

    loader();
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  const send = (e) => {
    console.log(e);
    navigate(`/user/${e}`);
  };
  const sendProject = (e) => {
    console.log(e);
    navigate(`/project/${e._id}`);
  };

  const showResults = () => {
    setShow(!show);
    console.log(show);
  };
  return (
    <div className="w-[100%] p-6 justify-center  flex flex-col bg-[#141619] h-[93vh]">
      <div className="flex items-center w-[100%]  h-[93vh]">
        <div className="w-[70%] bg-[#202326] flex items-center overflow-y-auto h-[93vh] searchResultsDiv flex-col">
          <div className=" flex flex-col gap-2  p-2 items-center searchResultsDiv w-[90%]">
            {feed
              ? feed.map((post) => {
                if (post.projectName) {
                  return (
                    <div
                      key={post._id}
                      // onClick={() => {
                      //   send(post.username);
                      // }}
                      onClick={() => {
                        sendProject(post)
                      }}
                      className=" hover:cursor-pointer  px-2 w-[100%] h-[30vh] bg-[#141619] text-white flex  rounded-lg justify-between"
                    >
                      <div className="w-[70%] ">
                        <span className="text-2xl font-mukta underline underline-offset-2">
                          {post.projectName}
                        </span>
                        <div className="text-xs h-[24vh] rounded-[10px] p-2 flex w-[100%] bg-[#272a2e]">
                          {post.description}
                        </div>
                      </div>


                      {
                        <img
                          src={post.projectPicture}
                          alt="profile"
                          className="  rounded-xl w-[30%] aspect-square object-cover overflow-hidden m-1"
                        />
                      }
                    </div>
                  );
                }

              })
              : ""}
          </div>
        </div>
        <div className="w-[30%] bg-[#292929]  flex  flex-col h-[93vh] items-center">
          <div className="w-[100%] flex  flex-col h-[93vh] items-center">
            <input
              onFocus={() => {
                showResults();
              }}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search Users"
              className="searchBar w-[100%] h-10 bg-[#292929] border-2 border-[#3e3e3e] 
              
              rounded-t-xs 
            text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              type="text"
            />{" "}
            <div
              className={`w-[100%] h-[93vh] searchResults 
            flex gap-2 bg-[#1E1F24] p-2 rounded-b-3xl  flex-col items-center`}
            >
              <div className="overflow-y-scroll flex flex-col gap-2 items-center searchResultsDiv w-[100%]">
                {users
                  ? users.map((user) => {
                    return (
                      <div
                        key={user.username}
                        onClick={() => {
                          send(user.username);
                        }}
                        className=" hover:cursor-pointer hover:bg-[#1f2125] border-[#1f2125] border-2 hover:border-white  px-2 w-[90%] bg-[#141619] text-white flex justify-between items-center rounded-lg"
                      >
                        {user.username}
                        {
                          <img
                            src={user.profilePicture}
                            alt="profile"
                            className="h-10 w-10   rounded-full object-cover m-1"
                          />
                        }
                      </div>
                    );
                  })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
