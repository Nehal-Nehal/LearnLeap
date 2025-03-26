import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { Institution } from '@/lib/types';

interface MapProps {
  institutions: Institution[];
  selectedInstitution: Institution | null;
  onMarkerClick: (institution: Institution) => void;
}

const containerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = {
  lat: 1.3521,
  lng: 103.8198,
};
const LIBRARIES: ("places")[] = ['places'];

const Map: React.FC<MapProps> = ({
  institutions,
  selectedInstitution,
  onMarkerClick,
}) => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  // Get user location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error('Geolocation error:', err)
    );
  }, []);

  // Recenter and calculate directions
  useEffect(() => {
    if (selectedInstitution) {
      setMapCenter({
        lat: selectedInstitution.latitude,
        lng: selectedInstitution.longitude,
      });

      if (userLocation) {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: userLocation,
            destination: {
              lat: selectedInstitution.latitude,
              lng: selectedInstitution.longitude,
            },
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK' && result) {
              setDirections(result);
            }
          }
        );
      }
    }
  }, [selectedInstitution, userLocation]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={12}
    >
      {/* User marker */}
      {userLocation && (
        <Marker position={userLocation} label="You" />
      )}

      {/* Institution markers */}
      {institutions.map((inst) => (
        <Marker
          key={inst.id}
          position={{ lat: inst.latitude, lng: inst.longitude }}
          label={inst.name}
          onClick={() => onMarkerClick(inst)}
        />
      ))}

      {/* Directions route */}
      {directions && (
        <DirectionsRenderer directions={directions} />
      )}
    </GoogleMap>
  );
};

export default Map;
