import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPropertyQuery } from '../../store/services/propertyService';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Map from '../../components/Map';  // Harita bileşenini import et

const DetailProp = () => {
  const { id } = useParams();  // URL'den ID'yi almak için useParams kullanılır
  const { data: property, isFetching, error } = useGetPropertyQuery(id);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading property details.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Swiper Slider */}
        <div className="w-full">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
          >
            <SwiperSlide>
              <img src={`/house/${property.image1}`} alt={property.title} className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`/house/${property.image2}`} alt={property.title} className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={`/house/${property.image3}`} alt={property.title} className="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Property Details */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-semibold">Description:</p>
          <p className="text-gray-700 mb-4">{property.description}</p>

          <p className="text-lg font-semibold">Price:</p>
          <p className="text-gray-700 mb-4">${property.price}</p>

          <p className="text-lg font-semibold">Address:</p>
          <p className="text-gray-700 mb-4">{property.address}, {property.city}</p>

          <p className="text-lg font-semibold">Bedrooms:</p>
          <p className="text-gray-700 mb-4">{property.bedrooms}</p>

          <p className="text-lg font-semibold">Bathrooms:</p>
          <p className="text-gray-700 mb-4">{property.bathrooms}</p>

          {/* Map Component */}
          <div className="mt-4 h-64">
            <Map
              lat={parseFloat(property.latitude)}
              lng={parseFloat(property.longitude)}
              onLocationChange={(lat, lng) => {
                console.log('New location:', lat, lng);
                // Yeni konum bilgilerini işlemek için bir işlev ekleyebilirsiniz
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProp;
