import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import Profile from "./pages/Profile"
import Signup from "./pages/signUp"
import Header from "./components/Header"
import Signin from "./pages/signIn"
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}
