// import React, { useState, useCallback, useRef } from "react";
// import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";

// const MapComponent = ({ center, places = [], propertyName = "Property Location" }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyA93tSLxeCpJkt_lACo4xjv0lrkkJ_9SGM",
//   });

//   const [mapCenter, setMapCenter] = useState(center);
//   const [zoom, setZoom] = useState(15);
//   const mapRef = useRef(null);
//   const [selectedPlace, setSelectedPlace] = useState(null);

//   const handleOnLoad = (map) => {
//     mapRef.current = map;
//   };

//   const handleMarkerClick = useCallback((place) => {
//     setSelectedPlace(place);
//     setMapCenter({ lat: place.latitude, lng: place.longitude });
//     setZoom(18);
//     if (mapRef.current) mapRef.current.setZoom(18);
//   }, []);

//   if (!isLoaded) return <div>Loading...</div>;

//   const getMarkerIcon = (placeTypes = []) => {
//     if (placeTypes.includes("restaurant")) return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
//     if (placeTypes.includes("hospital")) return "https://maps.google.com/mapfiles/ms/icons/hospitals.png";
//     if (placeTypes.includes("school")) return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
//     if (placeTypes.includes("gym")) return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
//     if (placeTypes.includes("shopping_mall") || placeTypes.includes("mall")) return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
//     if (placeTypes.includes("park")) return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
//     return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
//   };

//   return (
//     <GoogleMap
//       mapContainerStyle={{ width: "100%", height: "560px", borderRadius: 16 }}
//       center={mapCenter}
//       zoom={zoom}
//       onLoad={handleOnLoad}
//     >
//       {/* Property marker (big red) */}
//       <Marker
//         position={mapCenter}
//         title={propertyName}
//         icon={{
//           url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // 🔴 red marker
//           scaledSize: new window.google.maps.Size(60, 60), // bigger size
//         }}
//       />

//       {/* InfoWindow for property */}
//       <InfoWindow
//         position={mapCenter}
//         options={{ pixelOffset: new window.google.maps.Size(0, -50) }}
//       >
//         <div>
//           <strong>{propertyName}</strong>
//         </div>
//       </InfoWindow>

//       {/* Nearby places markers */}
//       {places.map((place, index) => (
//         <Marker
//           key={index}
//           position={{ lat: place.latitude, lng: place.longitude }}
//           icon={{
//             url: getMarkerIcon(place.types || []),
//             scaledSize: new window.google.maps.Size(40, 40),
//           }}
//           title={place.name}
//           onClick={() => handleMarkerClick(place)}
//         />
//       ))}

//       {/* InfoWindow for selected nearby place */}
//       {selectedPlace && (
//         <InfoWindow
//           position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
//           onCloseClick={() => setSelectedPlace(null)}
//         >
//           <div>
//             <h4>{selectedPlace.name}</h4>
//             {selectedPlace.types && (
//               <p>
//                 <strong>Types:</strong> {selectedPlace.types.join(", ")}
//               </p>
//             )}
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// };

// export default MapComponent;
import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

const MapComponent = ({ center, places = [], propertyAddress = "", propertyName = "Property Location" }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA93tSLxeCpJkt_lACo4xjv0lrkkJ_9SGM", // Replace with your valid key
  });

  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [addressCoords, setAddressCoords] = useState(null);

  const handleOnLoad = (map) => {
    mapRef.current = map;
  };

  const handleMarkerClick = useCallback((place) => {
    setSelectedPlace(place);
    setMapCenter({ lat: place.latitude, lng: place.longitude });
    setZoom(18);
    if (mapRef.current) mapRef.current.setZoom(18);
  }, []);

  // ✅ Geocode the property address to get lat/lng
  useEffect(() => {
    if (!propertyAddress) return;

    const fetchCoords = async () => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: propertyAddress,
              key: "AIzaSyA93tSLxeCpJkt_lACo4xjv0lrkkJ_9SGM", // Same key
            },
          }
        );

        if (res.data.status === "OK") {
          const location = res.data.results[0].geometry.location;
          setAddressCoords({ lat: location.lat, lng: location.lng });
        } else {
          console.error("Geocoding error:", res.data.status);
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
      }
    };

    fetchCoords();
  }, [propertyAddress]);

  if (!isLoaded) return <div>Loading...</div>;

  const getMarkerIcon = (placeTypes = []) => {
    if (placeTypes.includes("restaurant")) return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
    if (placeTypes.includes("hospital")) return "https://maps.google.com/mapfiles/ms/icons/hospitals.png";
    if (placeTypes.includes("school")) return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    if (placeTypes.includes("gym")) return "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
    if (placeTypes.includes("shopping_mall") || placeTypes.includes("mall")) return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    if (placeTypes.includes("park")) return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
    return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "560px", borderRadius: 16 }}
      center={mapCenter}
      zoom={zoom}
      onLoad={handleOnLoad}
    >
      {/* Address marker (big red) */}
      {addressCoords && (
        <Marker
          position={addressCoords}
          title={propertyAddress}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(60, 60),
          }}
        />
      )}

      {/* Property marker */}
      <Marker
        position={mapCenter}
        title={propertyName}
        icon={{
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />

      {/* Nearby places markers */}
      {places.map((place, index) => (
        <Marker
          key={index}
          position={{ lat: place.latitude, lng: place.longitude }}
          icon={{
            url: getMarkerIcon(place.types || []),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          title={place.name}
          onClick={() => handleMarkerClick(place)}
        />
      ))}

      {/* InfoWindow for selected nearby place */}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
            {selectedPlace.types && (
              <p>
                <strong>Types:</strong> {selectedPlace.types.join(", ")}
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
