import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [users, setUsers] = useState(null);
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
    };

    loader();
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  const send = (e) => {
    console.log(e);
    navigate(`/user/${e}`);
  };

  const showResults = () => {
    setShow(!show);
    console.log(show);
  };
  return (
    <div className="w-[100%] p-6 justify-center  flex flex-col bg-[#141619] h-[93vh]">
      <div className="flex  flex-col items-center w-[100%]">
        <div className="w-[50%] flex  flex-col items-center">
          <input
            onFocus={() => {
              showResults();
            }}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search..."
            className="searchBar w-[60%] h-10 bg-[#292929] border-2 border-[#3e3e3e] rounded-t-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            type="text"
          />{" "}
          <div
            className={`w-[60%] h-[200px] searchResults 
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
                        className="  px-2 w-[90%] bg-[#141619] text-white flex justify-between items-center rounded-lg"
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
  );
}
