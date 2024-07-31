import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Adminlogin from "../pages/auth/Adminlogin"
import Contact from "../pages/auth/Contact";
import Home from "../pages/dashboard/Home";
import UserHome from "../pages/dashboard/UserHome";
const Routing = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/home" element={<UserHome/>}/>
    <Route path="/login-admin" element={<Adminlogin/>}/>
    <Route path="/contact" element={<Contact/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default Routing