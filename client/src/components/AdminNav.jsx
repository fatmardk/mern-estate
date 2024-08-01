import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import '../../style/Nav.css';
import { logout } from "../store/reducers/authReducer";

const AdminNav = () => {
  const { adminToken, admin } = useSelector((state) => state.authReducer);
  console.log(admin);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout('adminToken'));
    localStorage.removeItem('admin-token');
    navigate('/adminlogin');
  };

  // Admin token yoksa hiçbir şey render etme
  if (!adminToken) return null;

  return (
    <nav className="bg-black bg-opacity-0 p-4 absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/admin" className="text-white text-lg font-semibold relative menu">
          Home
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-white font-semibold text-xl">Real-Estate</span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-10">
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/admin/new-property" className="cursor-pointer text-white relative menu">New Property</Link>
            <Link to="/admin/properties" className="cursor-pointer text-white relative menu">View Properties</Link>
          </div>
          <li className="list-none text-white relative menu">
            <span className="text-white capitalize relative">
              {admin?.name}
            </span>
          </li>
          <li className="list-none text-white relative cursor-pointer menu" onClick={handleLogout}>
            Logout
          </li>
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-black bg-opacity-70 p-4">
          <ul className="flex flex-col items-center space-y-4">
            <li className="cursor-pointer text-white relative menu">New Property</li>
            <li className="cursor-pointer text-white relative menu">View Properties</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default AdminNav;
