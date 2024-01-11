import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import Profile from "./pages/Profile"
import signIn from "./pages/signIn"
import signUp from "./pages/signUp"
import Header from "./components/Header"
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<signIn/>}/>
      <Route path="/sign-up" element={<signUp/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}
