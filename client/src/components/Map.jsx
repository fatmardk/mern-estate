import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '300px',
};

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974,
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
    <LoadScript googleMapsApiKey="AIzaSyCrLImoaYlRxEqZhf3ZUKdH1qh_oqDikBE">
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
