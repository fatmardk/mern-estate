import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 37.00128949807853,
  lng: 35.321856358738025,
};

const Map = ({ onLocationChange }) => {
  const [location, setLocation] = useState(defaultCenter);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ lat, lng });
    if (onLocationChange) {
      onLocationChange(lat, lng); // Notify parent component of the new location
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBSqj8GDLTGN6UDmKCwOe8svNXvly1CMJw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
