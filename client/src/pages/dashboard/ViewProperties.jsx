import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPropertiesQuery, useDeletePropertyMutation } from '../../store/services/propertyService';
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer';
import toast, { Toaster } from 'react-hot-toast';
import AdminNav from '../../components/AdminNav';
import { useNavigate } from 'react-router-dom';

const Properties = () => {
  // Fetch properties and handle loading state
  const { data = [], isFetching } = useGetPropertiesQuery();
  
  const [deleteProperty] = useDeletePropertyMutation();
  const { success } = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle success messages with toast notifications
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessage());
    }
  }, [success, dispatch]);

  // Function to handle property deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id).then(() => {
        dispatch(setSuccess('Property deleted successfully!'));
      });
    }
  };

  // Function to navigate to the new property form
  const handleAddProperty = () => {
    navigate('/admin/new-property');
  };

  // Render the page
  return (
    <>
      <div
        className="relative flex items-center justify-center min-h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/formbg.jpg')" }}
      >
        <AdminNav />
      </div>

      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Properties</h1>
          <button
            className="bg-white text-white p-2 w-25 rounded-full shadow-lg hover:bg-gray-600"
            onClick={handleAddProperty}
          >
            <span className="text-xl text-black hover:text-white">Add +</span>
          </button>
        </div>
        <Toaster position="top-right" />
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.length > 0 ? (
              data.map(property => (
                <div key={property.id} className="border rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`/house/${property.image1}`}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{property.title}</h2>
                    <p className="text-gray-600">{property.description}</p>
                    <p className="mt-2 text-lg font-bold">${property.price}</p>
                    <p className="text-sm text-gray-500">{property.address}, {property.city}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="btn btn-warning"
                        onClick={() =>navigate(`/admin/properties/edit/${property.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-alert"
                        onClick={() => handleDelete(property.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Properties;
