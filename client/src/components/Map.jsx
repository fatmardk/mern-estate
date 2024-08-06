import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

const Map = ({ onLocationChange }) => {
  const apiKey = "AIzaSyCrLImoaYlRxEqZhf3ZUKdH1qh_oqDikBE";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const [marker, setMarker] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const handleMapClick = useCallback((event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarker(newMarker);
    onLocationChange(newMarker.lat, newMarker.lng);
  }, [onLocationChange]);

  return (
    <>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 40.74857878612249, lng: -73.98561626666985 }}
          zoom={15}
          onClick={handleMapClick}
        >
          {marker && (
            <MarkerF
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
