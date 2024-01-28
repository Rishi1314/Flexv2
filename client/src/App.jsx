import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import EditProfile from "./pages/EditProfile"
import Signup from "./pages/signUp"
import Header from "./components/Header"
import Signin from "./pages/signIn"
import Dashboard from './pages/Dashboard';
import React, { useState } from 'react';


import {PrivateRoute, PrivateRouteOnboarding, PrivateRouteSign} from "./components/PrivateRoute"
import Onboarding from "./pages/Onboarding"
import Profile from "./pages/Profile"
export default function App() {
  const [currentpage, setCurrentpage] = useState("Home")
  const pull_data = (data) => {
    setCurrentpage(data)// LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    console.log(data);
  }
  return (
    <BrowserRouter>
    <div className="flex flex-col h-screen overflow-hidden">
    <Header/>
    <div className=" max-[767px]:relative min-[768px]:flex overflow-hidden">
    <Dashboard func={pull_data}/>
    <Routes>
    <Route element={<PrivateRoute/>}>
      
      <Route element={<PrivateRouteOnboarding/>}>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route path="/onboarding" element={<Onboarding/>}/>
      <Route path="/editprofile" element={<EditProfile/>}/>
    </Route>
      <Route path="/about" element={<About/>}/>
      <Route element={<PrivateRouteSign/>}>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      </Route>
      
      
    </Routes>
    </div>
    
    </div>
    
    </BrowserRouter>
  )
}

// import { BrowserRouter,Routes,Route } from "react-router-dom"
// import Home from "./pages/Home"
// import About from "./pages/About"
// import Profile from "./pages/Profile"
// import Signup from "./pages/signUp"
// import Header from "./components/Header"
// import Signin from "./pages/signIn"
// import PrivateRoute from "./components/PrivateRoute"
// export default function App() {
//   return (
//     <BrowserRouter>
//     <Header/>
//     <Routes>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/about" element={<About/>}/>
//       <Route path="/sign-in" element={<Signin/>}/>
//       <Route path="/sign-up" element={<Signup/>}/>
//       <Route element={<PrivateRoute/>}>
//       <Route path="/profile" element={<Profile/>}/>
//       </Route>
//     </Routes>
//     </BrowserRouter>
//   )
// }
