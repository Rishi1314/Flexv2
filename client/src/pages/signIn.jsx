import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const customConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      let res = await axios.post(
        "/api/auth/signin",
        JSON.stringify(formData),
        customConfig
      );

      const data = await res.data;

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.response.data));
    }
  };
  return (
    <div
      loading="lazy"
      className="flex  justify-center items-center min-h-screen w-[100%] bg-[#141619]"
    >
      <div
        className="p-3 text-white addProjectCard dashboardChild   rounded-[10px]
         shadow-lg ring-1 ring-black/5 w-[25%] max-[767px]:w-[90%]"
      >
        <h1 className="text-3xl text-center font-semibold my-7">Log In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col gap-4"
        >
          <div className="w-[70%] max-[767px]:w-[100%] swift relative">
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-[100%]
            addProjectCardInput p-3"
              onChange={handleChange}
            />
            <span className="input-border"></span>
          </div>
          <div className="w-[70%] max-[767px]:w-[100%] swift relative">
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="w-[100%]
            addProjectCardInput p-3"
              onChange={handleChange}
            />
            <span className="input-border"></span>
          </div>

          <button
            disabled={loading}
            className="button max-[767px]:w-[100%] text-[100%] w-[50%] font-mukta"
          >
            <span className="py-4 ">{loading ? "Loading..." : "Sign In"}</span>
          </button>
          <div className="bg-[#bbb] w-[70%] h-[1px]"></div>
          <div className="flex justify-center w-[100%] max:[767px]:w-[70%]">
            <OAuth />
          </div>
        </form>
        <div className="w-[100%] justify-center max-[767px]:flex-col max-[767px]:items-center flex gap-2 mt-5">
          <p>Dont Have an account?</p>
          <Link to="/sign-up" className="hover:scale-105  duration-200">
            <span className="  text-black px-2 rounded-lg font-mukta bg-white">
              Sign up
            </span>
          </Link>
        </div>
        <div className="flex w-[100%] justify-center">
          <p className="text-red-700 mt-5">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
