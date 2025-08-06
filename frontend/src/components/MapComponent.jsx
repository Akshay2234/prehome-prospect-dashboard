import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ center, places = [] }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA08jwhkUMNssPvaWsRlYE-S--IBpa4mUc',
  });

  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleOnLoad = (map) => {
    mapRef.current = map;
  };

  const handleMarkerClick = useCallback((place) => {
    setSelectedPlace(place);
    setMapCenter({ lat: place.latitude, lng: place.longitude });
    setZoom(18);
    if (mapRef.current) mapRef.current.setZoom(18);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  const getMarkerIcon = (placeTypes = []) => {
    if (placeTypes.includes('restaurant')) {
      return 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png';
    }
    if (placeTypes.includes('hospital')) {
      return 'https://maps.google.com/mapfiles/ms/icons/hospitals.png';
    }
    if (placeTypes.includes('school')) {
      return 'https://maps.google.com/mapfiles/ms/icons/schools.png';
    }
    if (placeTypes.includes('gym')) {
      return 'https://maps.google.com/mapfiles/ms/icons/fitness.png';
    }
    if (placeTypes.includes('shopping_mall') || placeTypes.includes('mall')) {
      return 'https://maps.google.com/mapfiles/ms/icons/shopping.png';
    }
    if (placeTypes.includes('park')) {
      return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
    }
    return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%',  height: '560px', borderRadius: 16 }}
      center={mapCenter}
      zoom={zoom}
      onLoad={handleOnLoad}
    >
      {/* Property marker */}
      <Marker
        position={mapCenter}
        title="Property Location"
        icon={{
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        }}
      />

      {/* Nearby places */}
      {places.map((place, index) => (
        <Marker
          key={index}
          position={{ lat: place.latitude, lng: place.longitude }}
          icon={{
            url: getMarkerIcon(place.types),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          title={place.name}
          onClick={() => handleMarkerClick(place)}
        />
      ))}

      {/* Info window */}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
            {selectedPlace.types && (
              <p>
                <strong>Types:</strong> {selectedPlace.types.join(', ')}
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
