import React, { useEffect, useRef, useState } from 'react';

interface NavigatingMapProps {
  institution: {
    school_name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  height?: string;
  width?: string;
}

// API Service for getCurrentLocation
const APIService = {
  getCurrentLocation: async () => {
    try {
      // Using browser's geolocation API
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });
      
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }
};

// Travel modes available in Google Maps
type TravelMode = 'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT' | 'TWO_WHEELER';

const NavigatingMap: React.FC<NavigatingMapProps> = ({ 
  institution,
  height = '300px',
  width = '100%'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState(institution.school_name);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsDisplay, setDirectionsDisplay] = useState<google.maps.DirectionsRenderer | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
  const [travelInfo, setTravelInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = ''; // Consider moving this to env variable

  // Initialize the map when component mounts
  useEffect(() => {
    // Load Google Maps API script dynamically if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      // If Google Maps API is already loaded
      initMap();
    }

    return () => {
      // Clean up if needed
    };
  }, []);

  // Update the end location when institution changes
  useEffect(() => {
    setEndLocation(institution.school_name);
    if (directionsService && directionsDisplay && startLocation) {
      calculateAndDisplayRoute();
    }
  }, [institution, directionsService, directionsDisplay, startLocation]);

  // Update route when travel mode changes
  useEffect(() => {
    if (directionsService && directionsDisplay && startLocation) {
      calculateAndDisplayRoute();
    }
  }, [travelMode]);

  // Initialize map and get user location automatically
  const initMap = async () => {
    if (!mapRef.current) return;

    // Initialize the Google Maps objects
    const newDirectionsService = new google.maps.DirectionsService();
    const newDirectionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeWeight: 5,
        strokeOpacity: 0.8
      }
    });
    
    // Create the map centered at the institution location
    const newMap = new google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: institution.latitude, lng: institution.longitude },
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    // Set the map for the DirectionsRenderer
    newDirectionsDisplay.setMap(newMap);
    
    setMap(newMap);
    setDirectionsService(newDirectionsService);
    setDirectionsDisplay(newDirectionsDisplay);
    
    // Automatically get user's current location and calculate route
    try {
      await getCurrentLocationAndRoute();
    } catch (error) {
      console.error('Failed to get automatic route:', error);
      // Show institution on map if we can't get user location
      const marker = new google.maps.Marker({
        position: { lat: institution.latitude, lng: institution.longitude },
        map: newMap,
        title: institution.school_name,
        animation: google.maps.Animation.DROP
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="font-weight:bold">${institution.school_name}</div><div>${institution.address}</div>`
      });
      
      marker.addListener('click', () => {
        infoWindow.open(newMap, marker);
      });
    }
  };

  // Get user location and calculate route
  const getCurrentLocationAndRoute = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const locationInfo = await APIService.getCurrentLocation();
      console.log('Received location:', locationInfo);
      
      // Format the location string and update the startLocation
      const formattedLocation = `${locationInfo.latitude}, ${locationInfo.longitude}`;
      setStartLocation(formattedLocation);
      
      // Route will be calculated automatically via useEffect when startLocation changes
    } catch (error) {
      console.error('Error getting current location:', error);
      setError('Unable to retrieve your location. Please check browser permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const getDirections = () => {
    calculateAndDisplayRoute();
  };

  const calculateAndDisplayRoute = () => {
    if (!directionsService || !directionsDisplay || !startLocation || !map) return;
    
    setIsLoading(true);
    setError(null);
    
    directionsService.route({
      origin: startLocation,
      destination: endLocation,
      travelMode: google.maps.TravelMode[travelMode],
      provideRouteAlternatives: true,
      optimizeWaypoints: true
    }, (response, status) => {
      if (status === 'OK' && response) {
        directionsDisplay.setDirections(response);
        
        // Extract travel information from response
        const route = response.routes[0];
        if (route && route.legs && route.legs.length > 0) {
          const { distance, duration } = route.legs[0];
          setTravelInfo({
            distance: distance?.text || 'Unknown',
            duration: duration?.text || 'Unknown'
          });
        }
        
        setError(null);
      } else {
        console.error('Directions request failed due to ' + status);
        setError(`Direction request failed: ${status}. Please try different locations or travel mode.`);
        setTravelInfo(null);
      }
      setIsLoading(false);
    });
  };

  const handleTravelModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTravelMode(e.target.value as TravelMode);
  };

  return (
    <div className="map-container" style={{ position: 'relative', height, width }}>
      {/* Floating panel for controls */}
      <div 
        id="floating-panel" 
        className="absolute top-4 left-4 right-4 lg:left-auto lg:max-w-md z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 text-sm"
      >
        <div className="flex flex-col gap-3">
          {/* Travel Info Display */}
          {travelInfo && (
            <div className="bg-blue-50 p-3 rounded-md mb-2 border border-blue-100">
              <div className="flex justify-between items-center">
                <div className="font-medium">Estimated Travel Info:</div>
                <div className="text-right">
                  <div className="font-bold text-blue-700">{travelInfo.duration}</div>
                  <div className="text-xs text-blue-600">{travelInfo.distance}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 p-3 rounded-md mb-2 border border-red-100 text-red-700">
              {error}
            </div>
          )}
          
          {/* Start Location Input */}
          <div className="flex items-center">
            <span className="font-medium w-16">Start:</span>
            <div className="flex-grow flex">
              <input 
                type="text" 
                value={startLocation} 
                onChange={(e) => setStartLocation(e.target.value)} 
                className="input-field flex-grow px-3 py-2 border rounded-l-md text-sm"
                placeholder="Enter start location" 
              />
              <button 
                onClick={getCurrentLocationAndRoute} 
                disabled={isLoading}
                className="location-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-r-md text-sm whitespace-nowrap transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Use Current'}
              </button>
            </div>
          </div>
          
          {/* End Location Input */}
          <div className="flex items-center">
            <span className="font-medium w-16">End:</span>
            <div className="flex-grow flex">
              <input 
                type="text" 
                value={endLocation} 
                onChange={(e) => setEndLocation(e.target.value)} 
                className="input-field flex-grow px-3 py-2 border rounded-l-md text-sm"
                placeholder="Enter destination" 
              />
              <button 
                onClick={getDirections} 
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-r-md text-sm transition-colors disabled:opacity-50"
              >
                {isLoading ? '...' : 'Go'}
              </button>
            </div>
          </div>
          
          {/* Travel Mode Selector */}
          <div className="flex items-center">
            <span className="font-medium w-16">Mode:</span>
            <select 
              value={travelMode} 
              onChange={handleTravelModeChange}
              className="flex-grow px-3 py-2 border rounded-md text-sm bg-white"
            >
              <option value="DRIVING">🚗 Driving</option>
              <option value="BICYCLING">🚲 Bicycling</option>
              <option value="WALKING">🚶 Walking</option>
              <option value="TRANSIT">🚌 Transit</option>
              <option value="TWO_WHEELER">🛵 Two-Wheeler</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div 
        id="map" 
        ref={mapRef} 
        className="h-full w-full rounded-md overflow-hidden" 
      />
    </div>
  );
};

export default NavigatingMap;