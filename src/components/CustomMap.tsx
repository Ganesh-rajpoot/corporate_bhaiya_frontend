import {
  LoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { countriesWeWork } from "../services/countriesWeWork";
import { useState, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "500px", // slightly smaller height
  borderRadius: "1rem",
  overflow: "hidden",
};

const center = { lat: 24.5, lng: 80.5 }; // India center

const CustomMap = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [mapRef, setMapRef] = useState<any>(null);

  const onLoad = useCallback((map: any) => {
    setMapRef(map);
  }, []);

  const handleMarkerClick = (state: any) => {
    setSelectedMarker(state);

    // Smooth zoom and pan to the marker
    if (mapRef) {
      mapRef.panTo({ lat: state.lat, lng: state.lng });
      mapRef.setZoom(8); // zoom in when clicked
    }
  };

  const allStates = countriesWeWork.flatMap((country) =>
    country.states.map((state) => ({ ...state, country: country.name }))
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 rounded-2xl overflow-hidden shadow-xl">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            gestureHandling: "greedy", // better touch control
          }}
        >
          {allStates.map((state, idx) => (
            <MarkerF
              key={idx}
              position={{ lat: state.lat, lng: state.lng }}
              title={`${state.name}, ${state.country}`}
              onClick={() => handleMarkerClick(state)}
            />
          ))}

          {selectedMarker && (
            <InfoWindowF
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2">
                <img
                  src={`https://flagcdn.com/48x36/${selectedMarker.code}.png`}
                  alt={selectedMarker.name}
                  className="mx-auto mb-2 rounded shadow-md group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width={48}
                  height={36}
                />

                <h2 className="font-semibold text-amber-950">
                  {selectedMarker.name}
                </h2>
                <p className="text-sm text-amber-950">
                  {selectedMarker.country}
                </p>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CustomMap;
