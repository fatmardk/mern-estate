import AdminNav from "../../components/AdminNav";

const AdminHome = () => {
  return (
    <>
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/formbg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <AdminNav />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-10 text-white mt-16">
          {/* Rental Properties Block */}
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Properties</h2>
            <p className="mb-4">
            You can safely and comfortably view your properties and communicate with your customers safely.
            </p>
            <a href="/admin/new-property">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
                Create New
              </button>
            </a>
          </div>

          {/* Sale Properties Block */}
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">View Rental Properties</h2>
            <p className="mb-4">
            You can view and change the properties you have published.
            </p>
            <a href="/admin/properties/buy">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
                View Rentals
              </button>
            </a>
          </div>

          <div className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">View Sale Properties</h2>
            <p className="mb-4">
            You can view and change the properties you have published.
            </p>
            <a href="/admin/properties/buy">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
                View Sales
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
