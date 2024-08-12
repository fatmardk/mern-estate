import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";

const UserHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/homebg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <Nav />
        <div className="relative z-10 text-white text-center mt-10">
          <h1 className="text-4xl font-bold">Agents. Tours. Loans. Homes.</h1>
          <div className="mt-4 flex items-center bg-white rounded shadow-md overflow-hidden w-80 md:w-96">
            <input
              type="text"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              className="px-4 py-2 w-full text-black outline-none w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="p-2 bg-gray-200 hover:bg-gray-300"
              onClick={handleSearch}
            >
              <GoSearch size={25} className="text-black" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-5 md:py-5 bg-gray-200">
        <div className="bg-white rounded-lg shadow-2xl p-6 flex-1 max-w-full">
          <div className="flex justify-center mb-4 sm:w-full">
            <img src="/buy-home.png" alt="Buy a home icon" className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Buy a home</h3>
          <p className="text-gray-600 mb-4 text-center">
            Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.
          </p>
          <div className="flex justify-center">
            <Link to="/all-property/buy">
              <button className="bg-gray-500 text-white px-4 py-2 rounded">Browse homes</button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6 flex-1 max-w-full">
          <div className="flex justify-center mb-4">
            <img src="/sell.png" alt="Sell a home icon" className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Sell a home</h3>
          <p className="text-gray-600 mb-4 text-center">
            No matter what path you take to sell your home, we can help you navigate a successful sale.
          </p>
          <div className="flex justify-center">
            <Link to="/login-admin">
              <button className="bg-gray-500 text-white px-4 py-2 rounded my-5">See your options</button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6 flex-1 max-w-full">
          <div className="flex justify-center mb-4">
            <img src="/rent.png" alt="Rent a home icon" className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">Rent a home</h3>
          <p className="text-gray-600 mb-4 text-center">
            We’re creating a seamless online experience—from shopping on the largest rental network, to applying, to paying rent.
          </p>
          <div className="flex justify-center">
            <Link to="/all-property/rent">
              <button className="bg-gray-500 text-white px-4 py-2 rounded">Find rentals</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
