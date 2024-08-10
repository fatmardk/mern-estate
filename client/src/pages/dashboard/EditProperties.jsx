import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetPropertyQuery,
  useUpdatePropertyMutation,
} from "../../store/services/propertyService";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import AdminNav from "../../components/AdminNav";
import Map from "../../components/Map";
// import "react-quill/dist/quill.snow.css";

const EditProperty = () => {
  const { id } = useParams();
  const { data: property, isFetching: fetching } = useGetPropertyQuery(id);
  console.log("Data:", property);
  console.log("Fetching:", fetching);

  const [updateProperty, error, isSuccess, isLoading] =
    useUpdatePropertyMutation();
  console.log(error);

  const [state, setState] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    image1: null,
    image2: null,
    image3: null,
    location: { lat: "", lng: "" },
    furnished: false,
    parking: false,
    security: false,
  });
  const [preview, setPreview] = useState({
    image1: "",
    image2: "",
    image3: "",
  });
  const navigate = useNavigate();
  console.log("property", property);

  useEffect(() => {
    if (property) {
      setState({
        ...property,
        location: {
          lat: parseFloat(property.latitude),
          lng: parseFloat(property.longitude),
        },
      });

      // Set preview images if needed
      if (property.image1)
        setPreview((prev) => ({
          ...prev,
          image1: `/house/${property.image1}`,
        }));
      if (property.image2)
        setPreview((prev) => ({
          ...prev,
          image2: `/house/${property.image2}`,
        }));
      if (property.image3)
        setPreview((prev) => ({
          ...prev,
          image3: `/house/${property.image3}`,
        }));
    }
  }, [property]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prevPreview) => ({
          ...prevPreview,
          [e.target.name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationChange = (lat, lng) => {
    setState((prevState) => ({
      ...prevState,
      location: { lat, lng },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("address", state.address);
    formData.append("city", state.city);
    formData.append("price", state.price);
    formData.append("bedrooms", state.bedrooms);
    formData.append("bathrooms", state.bathrooms);

    if (state.image1) formData.append("image1", state.image1);
    if (state.image2) formData.append("image2", state.image2);
    if (state.image3) formData.append("image3", state.image3);

    if (
      state.location
    ) {
      formData.append("latitude", parseFloat(state.location.lat));
      formData.append("longitude", parseFloat(state.location.lng));
    } else {
      console.error("Invalid location data");
    }

    formData.append("furnished", state.furnished ? "1" : "0");
    formData.append("parking", state.parking ? "1" : "0");
    formData.append("security", state.security ? "1" : "0");

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    updateProperty({ id, data: formData });
    
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.error?.data?.message || "Bir hata oluştu");
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Property updated successfully!");
      navigate("/admin/properties");
    }
  }, [isSuccess]);
  console.log("state", state);

  return (
    <>
      <div
        className="relative flex items-center justify-center min-h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/formbg.jpg')" }}
      >
        <AdminNav />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <p className="text-white text-4xl font-bold">Edit Property</p>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={true} />
      {!fetching ? (
        <div className="flex flex-wrap -mx-3 space-y-8 bg-stone-400 p-6 rounded-lg shadow-lg justify-center">
          <form
            className="w-full xl:w-8/12 p-6 bg-stone-600 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <Link
              to="/admin/properties"
              className="text-white font-bold hover:underline"
            >
              Back to Properties
            </Link>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="labelinput"
                  id="title"
                  placeholder="Title..."
                  onChange={handleInput}
                  value={state.title}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="labelinput"
                  id="price"
                  placeholder="Price..."
                  onChange={handleInput}
                  value={state.price}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="bedrooms" className="label">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  className="labelinput"
                  id="bedrooms"
                  placeholder="Bedrooms..."
                  onChange={handleInput}
                  value={state.bedrooms}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="bathrooms" className="label">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  className="labelinput"
                  id="bathrooms"
                  placeholder="Bathrooms..."
                  onChange={handleInput}
                  value={state.bathrooms}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="labelinput"
                  id="address"
                  placeholder="Address..."
                  onChange={handleInput}
                  value={state.address}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="city" className="label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="labelinput"
                  id="city"
                  placeholder="City..."
                  onChange={handleInput}
                  value={state.city}
                />
              </div>

              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  name="description"
                  className="labelinput"
                  id="description"
                  placeholder="Description..."
                  onChange={handleInput}
                  value={state.description}
                ></textarea>
              </div>

              <div className="w-full p-3">
                <label htmlFor="image1" className="label">
                  Image 1
                </label>
                <input
                  type="file"
                  name="image1"
                  id="image1"
                  className="input-file mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  onChange={handleFileChange}
                />
                {preview.image1 && (
                  <img
                    src={preview.image1}
                    alt="Preview"
                    className="mt-2 w-full h-auto"
                  />
                )}
              </div>

              <div className="w-full p-3">
                <label htmlFor="image2" className="label">
                  Image 2
                </label>
                <input
                  type="file"
                  name="image2"
                  id="image2"
                  className="input-file mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  onChange={handleFileChange}
                />
                {preview.image2 && (
                  <img
                    src={preview.image2}
                    alt="Preview"
                    className="mt-2 w-full h-auto"
                  />
                )}
              </div>

              <div className="w-full p-3">
                <label htmlFor="image3" className="label">
                  Image 3
                </label>
                <input
                  type="file"
                  name="image3"
                  id="image3"
                  className="input-file mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  onChange={handleFileChange}
                />
                {preview.image3 && (
                  <img
                    src={preview.image3}
                    alt="Preview"
                    className="mt-2 w-full h-auto"
                  />
                )}
              </div>

              <div className="w-full p-3">
                <label htmlFor="furnished" className="label">
                  Furnished
                </label>
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="form-checkbox mt-2 checked:bg-black checked:border-transparent focus:ring-gray-500 h-6 w-6"
                  onChange={handleInput}
                  checked={state.furnished}
                />
              </div>

              <div className="w-full p-3">
                <label htmlFor="parking" className="label">
                  Parking
                </label>
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="form-checkbox mt-2 checked:bg-black checked:border-transparent focus:ring-gray-500 h-6 w-6"
                  onChange={handleInput}
                  checked={state.parking}
                />
              </div>

              <div className="w-full p-3">
                <label htmlFor="security" className="label">
                  Security
                </label>
                <input
                  type="checkbox"
                  name="security"
                  id="security"
                  className="form-checkbox mt-2 checked:bg-black checked:border-transparent focus:ring-gray-500 h-6 w-6"
                  onChange={handleInput}
                  checked={state.security}
                />
              </div>

              <div className="w-full p-3">
                <label htmlFor="map" className="label">
                  Location
                </label>
                <Map
                  onLocationChange={handleLocationChange}
                  lat={state.location.lat}
                  lng={state.location.lng}
                />
              </div>

              <div className="w-full p-3">
                <input
                  type="submit"
                  value={isLoading ? "Updating..." : "Update Property"}
                  disabled={isLoading}
                  className="btn btn-dark bg-white text-gray-700 py-2 px-4 rounded-md hover:bg-stone-400"
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default EditProperty;
