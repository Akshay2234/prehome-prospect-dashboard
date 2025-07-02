import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ center, places, onRadiusChange }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA08jwhkUMNssPvaWsRlYE-S--IBpa4mUc',
  });

  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null); // For optional InfoWindow

  const getRadiusByZoom = (zoomLevel) => Math.round(1500 / Math.pow(2, zoomLevel - 15));

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      setZoom(newZoom);
      const newRadius = getRadiusByZoom(newZoom);
      if (onRadiusChange) onRadiusChange(newRadius);
    }
  };

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
  const getMarkerIcon = (placeTypes) => {
  if (placeTypes.includes('restaurant')) {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCaJTjwWq0EegGyFhxCf0_VSFIz_lO5rv5eQ&s';
  }
  // You can add more type-to-icon mappings here
  return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'; // default marker
};


  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={mapCenter}
      zoom={zoom}
      onZoomChanged={handleZoomChanged}
      onLoad={handleOnLoad}
    >
      {/* Marker at the center of the map */}
      <Marker position={mapCenter} />

      {/* Nearby Places Markers */}
      {places.map((place, index) => (
        <Marker
          key={index}
          position={{ lat: place.latitude, lng: place.longitude }}
          icon={{
      url: getMarkerIcon(place.types),
      scaledSize: new window.google.maps.Size(40, 40)
    }}
          title={place.name}
          onClick={() => handleMarkerClick(place)}
        />
      ))}

      {/* Optional: InfoWindow on Marker Click */}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
            {selectedPlace.types && <p>Types: {selectedPlace.types.join(', ')}</p>}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
