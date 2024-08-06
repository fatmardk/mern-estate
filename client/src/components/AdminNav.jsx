import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import '../../style/Nav.css';
import { logout } from "../store/reducers/authReducer";

const AdminNav = () => {
  const { adminToken, admin } = useSelector((state) => state.authReducer);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout('adminToken'));
    navigate('/login-admin');
  };

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
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="cursor-pointer text-white relative menu"
              >
                View Properties
              </button>
              {dropdownOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-black/50">
                  <div className="py-1">
                    <Link to="/admin/properties/buy" className="block px-4 py-2 text-sm text-white hover:bg-black">Houses for Sale</Link>
                    <Link to="/admin/properties/rent" className="block px-4 py-2 text-sm text-white hover:bg-black">Houses for Rent</Link>
                  </div>
                </div>
              )}
            </div>
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
            <Link to="/admin/new-property">
              <li className="cursor-pointer text-white relative menu">New Property</li>
            </Link>
            <li className="cursor-pointer text-white relative menu" onClick={toggleDropdown}>
              View Properties
              {dropdownOpen && (
                <ul className="mt-2 rounded shadow-lg">
                  <li className="">
                    <Link to="/admin/properties/buy" className="block px-4 py-2 text-sm text-white menu">Houses for Sale</Link>
                  </li>
                  <li>
                    <Link to="/admin/properties/rent" className="block px-4 py-2 text-sm text-white ">Houses for Rent</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default AdminNav;
