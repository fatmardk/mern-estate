import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPropertiesQuery } from '../../store/services/propertyService';
import { clearMessage } from '../../store/reducers/globalReducer';
import toast, { Toaster } from 'react-hot-toast';
import Nav from '../../components/Nav';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const ViewProp = () => {
  const { data = [], isFetching } = useGetPropertiesQuery();
  const { success } = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessage());
    }
  }, [success, dispatch]);

  return (
    <>
      <div
        className="relative flex items-center justify-center min-h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/homebg.jpg')" }}
      >
        <Nav />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <p className="text-white text-4xl font-bold">
            Rent 
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Properties</h1>
        <p>{data.length}+ listings</p>
        <Toaster position="top-right" />
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.length > 0 ? (
              data.map(property => (
                <Link to={`/all-property/${property.id}`} key={property.id} className="no-underline">
                  <div className="border rounded-lg overflow-hidden shadow-lg flex cursor-pointer">
                    <div className="w-1/3">
                      <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{
                          clickable: true
                        }}
                        navigation
                      >
                        <SwiperSlide>
                          <img
                            src={`/house/${property.image1}`}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/house/${property.image2}`}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={`/house/${property.image3}`}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <div className="w-2/3 p-4">
                      <h2 className="text-xl font-semibold">{property.title}</h2>
                      <p className="text-gray-600 mt-2">{property.description}</p>
                      <p className="mt-4 text-lg font-bold">${property.price}</p>
                      <p className="text-sm text-gray-500 mt-2">{property.address}, {property.city}</p>
                      <p className="text-lg text-black mt-2"><span className='font-semibold'>{property.bedrooms}</span>bd | <span className='font-semibold'>{property.bathrooms}</span>ba</p>
                    </div>
                  </div>
                </Link>
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

export default ViewProp;
