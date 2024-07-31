import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black bg-opacity-0 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Home
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-white font-semibold text-xl">Real-Estate</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-10">
            <Link to="#" className="cursor-pointer text-white">Loans</Link>
            <Link to="#" className="cursor-pointer text-white">Sell</Link>
            <Link to="#" className="cursor-pointer text-white">Rent</Link>
            <Link to="#" className="cursor-pointer text-white">Buy</Link>
          </div>
          {userToken ? (
            <li className="list-none text-white">
              <Link to="/user" className="text-white capitalize">
                {user?.name}
              </Link>
            </li>
          ) : (
            <li className="list-none text-white">
              <Link to="/login" className="text-white">
                Sign In
              </Link>
            </li>
          )}
          <li className="list-none text-white">Logout</li>
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
            <li className="cursor-pointer text-white">Loans</li>
            <li className="cursor-pointer text-white">Sell</li>
            <li className="cursor-pointer text-white">Rent</li>
            <li className="cursor-pointer text-white">Buy</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
