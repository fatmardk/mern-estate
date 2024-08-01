import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreatePropertyMutation } from "../../store/services/propertyService";
import Spinner from "../../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Map from "../../components/Map";
import AdminNav from "../../components/AdminNav";
import "../../../style/form.css"

const CreateProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createProperty, { isLoading, isSuccess, error }] =
    useCreatePropertyMutation();

  const [state, setState] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    image1: "",
    image2: "",
    image3: "",
    location: { lat: "", lng: "" },
    furnished: false,
    parking: false,
    security: false,
  });

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const imageHandle = (e) => {
    if (e.target.files.length > 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    }
  };

  const handleLocationChange = (lat, lng) => {
    setState({ ...state, location: { lat, lng } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).forEach((key) => {
      formData.append(key, state[key]);
    });
    createProperty(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Property created successfully!");
      navigate("/dashboard/properties");
    }
  }, [isSuccess]);

  return (
    <>
      <div
        className="relative flex items-center justify-center min-h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/formbg.jpg')" }}
      >
        <AdminNav/>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-60 flex items-center justify-center">
          <p className="text-white text-4xl font-bold">
            Sell Your Home With Confidence
          </p>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex flex-wrap -mx-3 space-y-8  bg-gray-700 p-6 rounded-lg shadow-lg justify-center">
        
        <form className="w-full xl:w-8/12 p-6 bg-white rounded-lg shadow-md " onSubmit={handleSubmit}>
          <Link to="/admin/properties" className="text-black font-bold hover:underline">Create New Property</Link>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="title"
                placeholder="Title..."
                onChange={handleInput}
                value={state.title}
              />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="price" className="label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="price"
                placeholder="Price..."
                onChange={handleInput}
                value={state.price}
              />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="bedrooms" className="label">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="bedrooms"
                placeholder="Bedrooms..."
                onChange={handleInput}
                value={state.bedrooms}
              />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="bathrooms" className="label">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="bathrooms"
                placeholder="Bathrooms..."
                onChange={handleInput}
                value={state.bathrooms}
              />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="address" className="label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="address"
                placeholder="Address..."
                onChange={handleInput}
                value={state.address}
              />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="city" className="label">City</label>
              <input
                type="text"
                name="city"
                className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="city"
                placeholder="City..."
                onChange={handleInput}
                value={state.city}
              />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="description" className="label">Description</label>
              <textarea
                name="description"
                className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="description"
                placeholder="Description..."
                onChange={handleInput}
                value={state.description}
              ></textarea>
            </div>

            <div className="w-full p-3">
              <label htmlFor="image1" className="label">Image 1</label>
              <input
                type="file"
                name="image1"
                id="image1"
                className="input-file mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                onChange={imageHandle}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="image2" className="label">Image 2</label>
              <input
                type="file"
                name="image2"
                id="image2"
                className="input-file mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                onChange={imageHandle}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="image3" className="label">Image 3</label>
              <input
                type="file"
                name="image3"
                id="image3"
                className="input-file mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                onChange={imageHandle}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="furnished" className="label">Furnished</label>
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="form-checkbox mt-1"
                onChange={handleInput}
                checked={state.furnished}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="parking" className="label">Parking</label>
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="form-checkbox mt-1"
                onChange={handleInput}
                checked={state.parking}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="security" className="label">Security</label>
              <input
                type="checkbox"
                name="security"
                id="security"
                className="form-checkbox mt-1"
                onChange={handleInput}
                checked={state.security}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="map" className="label">Location</label>
              <Map onLocationChange={handleLocationChange} /> {/* Custom Map component */}
            </div>

            <div className="w-full p-3">
              <input
                type="submit"
                value={isLoading ? "Saving..." : "Save Property"}
                disabled={isLoading}
                className="btn btn-dark bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProperty;
