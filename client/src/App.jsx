import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import EditProfile from "./pages/EditProfile"
import Signup from "./pages/signUp"
import Header from "./components/Header"
import Signin from "./pages/signIn"
import Dashboard from './pages/Dashboard';
import  { useState } from 'react';
import { PrivateRoute, PrivateRouteOnboarding, PrivateRouteSign } from "./components/PrivateRoute"
import Onboarding from "./pages/Onboarding"
import Profile from "./pages/Profile"
import Projects from "./pages/Projects"
import { PublicProfile } from "./pages/PublicProfile"
import Resources from "./pages/Resources"
import Notes from "./pages/Notes"
import Tasks from "./pages/Tasks"
import {CustomKanban} from "./pages/Todo"
import EditProject from "./pages/EditProject"
export default function App() {
  const [currentpage, setCurrentpage] = useState("Home")
  const pull_data = (data) => {
    setCurrentpage(data)
  }
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className=" max-[767px]:relative min-[768px]:flex overflow-hidden">
          <Dashboard func={pull_data} />
          <Routes>
            <Route element={<PrivateRoute />}>

              <Route element={<PrivateRouteOnboarding />}>

                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/notes" element={<Notes />} />
                <Route path="/resources/tasks" element={<Tasks />} />
                <Route path="/resources/todo" element={<CustomKanban />} />
                <Route path="/projects/editProject/:projectId" element={<EditProject />} />
              </Route>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/editprofile" element={<EditProfile />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/user/:id?" element={<PublicProfile />} />

            <Route element={<PrivateRouteSign />}>
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
            </Route>


          </Routes>
        </div>

      </div>

    </BrowserRouter>
  )
}

