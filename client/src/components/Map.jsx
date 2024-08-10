import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

const Map = ({ onLocationChange, lat, lng }) => {
  const apiKey = "AIzaSyCrLImoaYlRxEqZhf3ZUKdH1qh_oqDikBE";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const [marker, setMarker] = useState({lat,lng});

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

  useEffect(() => {
    if (isLoaded && lat && lng) {
      setMarker({ lat, lng });
    }
  }, [isLoaded, lat, lng]);

  return (
    <>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={15}
          onClick={handleMapClick}
        >
          {marker && (
            <MarkerF
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
