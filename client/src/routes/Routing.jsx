import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Adminlogin from "../pages/auth/Adminlogin"
import Contact from "../pages/auth/Contact";
import UserHome from "../pages/dashboard/UserHome";
import AdminHome from "../pages/dashboard/AdminHome";
const Routing = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<UserHome/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/home" element={<UserHome/>}/>
    <Route path="/login-admin" element={<Adminlogin/>}/>
    <Route path="/admin" element={<AdminHome/>}/>
    <Route path="/contact" element={<Contact/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default Routing