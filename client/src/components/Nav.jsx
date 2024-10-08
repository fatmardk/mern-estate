import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "../../style/Nav.css";
import { logout } from "../store/reducers/authReducer";

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout("userToken"));
    navigate("/login");
  };

  return (
    <nav className="bg-black bg-opacity-0 p-4 absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold relative menu">
          Home
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-white font-semibold text-xl">Real-Estate</span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-10">
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="cursor-pointer text-white relative menu">
              Loans
            </Link>
            <Link to="/login/admin" className="cursor-pointer text-white relative menu">
              Sell
            </Link>
            <Link to="/all-property/rent" className="cursor-pointer text-white relative menu">
              Rent
            </Link>
            <Link to="/all-property/buy" className="cursor-pointer text-white relative menu">
              Buy
            </Link>
          </div>
          {userToken ? (
            <>
              <li className="list-none text-white relative menu">
                <Link to="/user" className="text-white capitalize relative">
                  {user?.name}
                </Link>
              </li>
              <li
                className="list-none text-white relative cursor-pointer menu"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <li className="list-none text-white relative menu">
              <Link to="/login" className="text-white relative">
                Sign In
              </Link>
            </li>
          )}
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
            <li className="cursor-pointer text-white relative menu">Loans</li>
            <Link to="/login-admin" className="cursor-pointer text-white relative menu">
              Sell
            </Link>
            <Link to="/all-property/rent" className="cursor-pointer text-white relative menu">
              Rent
            </Link>
            <Link to="/all-property/buy" className="cursor-pointer text-white relative menu">
              Buy
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
