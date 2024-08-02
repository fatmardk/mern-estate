import { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import Spinner from "../components/Spinner";

const MapDash = ({ center }) => {
  const apiKey = "AIzaSyCrLImoaYlRxEqZhf3ZUKdH1qh_oqDikBE";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const [selectedPlace, setSelectedPlace] = useState();

  const containerStyle = {
    width: "60%",
    height: "50vh",
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseInfoWindow = () => {
    setSelectedPlace();
  };

  const place = {
    id: 1,
    coordinates: {
      lat: 37.05490978325893,
      lng: 35.2881369799229,
    },
    name: "Sercan Restaurant",
  };

  return (
    <>
      {!isLoaded ? (
        <Spinner />
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center || { lat: 37.00128949807853, lng: 35.321856358738025 }} // Use the provided center or a default value
          zoom={15}
        >
          <Marker
            key={place.id}
            position={{
              lat: Number(place.coordinates.lat),
              lng: Number(place.coordinates.lng),
            }}
            onClick={() => handleMarkerClick(place)}
          />

          {selectedPlace && (
            <InfoWindow
              position={{
                lat: Number(selectedPlace.coordinates.lat),
                lng: Number(selectedPlace.coordinates.lng),
              }}
              onCloseClick={handleCloseInfoWindow}
            >
              <div>
                <h3>Place: {selectedPlace.name}</h3>
                <p>
                  Location: ({selectedPlace.coordinates.lat},
                  {selectedPlace.coordinates.lng})
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default MapDash;
