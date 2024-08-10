import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Adminlogin from "../pages/auth/Adminlogin"
import Contact from "../pages/auth/Contact";
import UserHome from "../pages/dashboard/UserHome";
import AdminHome from "../pages/dashboard/AdminHome";
import CreateProperty from "../pages/dashboard/CreateProperties";
import Properties from "../pages/dashboard/Properties";
import Map from "../components/Map";
import ViewProperties from "../pages/dashboard/ViewProperties";
import EditProperty from "../pages/dashboard/EditProperties";
import ViewProp from "../pages/user/ViewProp";
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
    <Route path="/admin/new-property" element={<CreateProperty/>}/>
    <Route path="/admin/properties" element={<ViewProperties/>}/>
    <Route path="/admin/properties/buy" element={<ViewProperties/>}/>
    <Route path="/admin/properties/rent" element={<ViewProperties/>}/>
    <Route path="/admin/properties/edit/:id" element={<EditProperty/>}/>
    <Route path="/all-property/rent" element={<ViewProp/>}/>
    <Route path="/all-property/buy" element={<ViewProp/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/map" element={<Map />}/>

    </Routes>

    </BrowserRouter>
  )
}

export default Routing