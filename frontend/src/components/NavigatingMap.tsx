import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

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

// Define the hawker center structure based on API response
interface HawkerCenter {
  name: string;
  address: {
    block: string;
    building: string;
    postal_code: string;
    street: string;
  };
  distance: number;
  full_address: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

// API Service for getCurrentLocation and hawker centers
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
  },
  
  getNearbyHawkers: async (latitude: number, longitude: number, radius: number = 1.0) => {
    try {
      // Round coordinates to 5 decimal places to avoid precision issues
      const roundedLat = parseFloat(latitude.toFixed(5));
      const roundedLng = parseFloat(longitude.toFixed(5));
      
      // Make sure radius is a float with at least one decimal place
      // This ensures we don't get 404 errors with whole numbers
      const formattedRadius = parseFloat(radius.toFixed(1));
      
      const response = await axios.get(`http://127.0.0.1:5000/nearby-hawkers/${roundedLat}/${roundedLng}/${formattedRadius}`);
      
      // Check if response has the expected structure
      if (response.data && response.data.data) {
        return response.data.data as HawkerCenter[];
      } else {
        console.warn('Unexpected API response format:', response.data);
        return []; // Return empty array instead of throwing
      }
    } catch (error) {
      console.error('Error fetching nearby hawker centers:', error);
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
  const [hawkerCenters, setHawkerCenters] = useState<HawkerCenter[]>([]);
  const [hawkerRadius, setHawkerRadius] = useState<number>(1.0);
  const [showingHawkers, setShowingHawkers] = useState(false);
  const [hawkerMarkers, setHawkerMarkers] = useState<google.maps.Marker[]>([]);
  const apiKey = 'AIzaSyByQ0_LHlYRlS_WBW8C7uq4fiGZfkuGPZQ'; // Consider moving this to env variable

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
      clearHawkerMarkers();
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
  
  // Function to find and display nearby hawker centers
  const findNearbyHawkers = async () => {
    if (!map) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Clear any existing hawker markers
      clearHawkerMarkers();
      
      // Use the institution's coordinates
      let latitude = institution.latitude;
      let longitude = institution.longitude;
      
      console.log(`Finding hawkers near: ${latitude}, ${longitude} with radius ${hawkerRadius}km`);
      
      // Create an info window that will be reused for all markers
      const infoWindow = new google.maps.InfoWindow();
      
      // Fetch nearby hawker centers from API
      const hawkerData = await APIService.getNearbyHawkers(latitude, longitude, hawkerRadius);
      console.log('Hawker API response:', hawkerData);
      
      // Check if we got valid data back
      if (!hawkerData || !Array.isArray(hawkerData) || hawkerData.length === 0) {
        setError('No hawker centers found within the specified radius. Try increasing the search area.');
        setHawkerCenters([]);
        setShowingHawkers(false);
        return;
      }
      
      // Store the results
      setHawkerCenters(hawkerData);
      setShowingHawkers(true);
      
      // Success message
      console.log(`Found ${hawkerData.length} hawker centers`);
      
      // Create markers for each hawker center
      const markers: google.maps.Marker[] = [];
      
      hawkerData.forEach(hawker => {
        // Make sure we have valid coordinates
        if (!hawker.location || typeof hawker.location.latitude !== 'number' || typeof hawker.location.longitude !== 'number') {
          console.warn('Invalid location data for hawker center:', hawker.name);
          return; // Skip this hawker center
        }
        
        const marker = new google.maps.Marker({
          position: { 
            lat: hawker.location.latitude, 
            lng: hawker.location.longitude 
          },
          map: map,
          title: hawker.name,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            scaledSize: new google.maps.Size(32, 32)
          },
          animation: google.maps.Animation.DROP
        });
        
        // Add click listener to show hawker center info
        marker.addListener('click', () => {
          const content = `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${hawker.name}</h3>
              <p style="font-size: 12px; margin-bottom: 5px;">${hawker.full_address}</p>
              <p style="font-size: 12px; color: #666;">Distance: ${hawker.distance.toFixed(2)} km</p>
              <button 
                id="directions-btn" 
                style="background: #3B82F6; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer; margin-top: 5px;"
              >
                Get Directions
              </button>
            </div>
          `;
          
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
          
          // Add a slight delay to ensure the DOM is ready
          setTimeout(() => {
            // Add click event to the Get Directions button
            const directionsBtn = document.getElementById('directions-btn');
            if (directionsBtn) {
              directionsBtn.addEventListener('click', () => {
                // Set the hawker center as the end location
                setEndLocation(hawker.name);
                calculateAndDisplayRoute();
                infoWindow.close();
              });
            }
          }, 100);
        });
        
        markers.push(marker);
      });
      
      // Store markers so they can be cleared later
      setHawkerMarkers(markers);
      
      // If we found hawker centers, fit the map bounds to show all of them
      if (hawkerData.length > 0 && markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()!));
        
        // Also include the institution in the bounds
        bounds.extend({ lat: institution.latitude, lng: institution.longitude });
        
        map.fitBounds(bounds);
        
        // Clear any error since we successfully displayed hawker centers
        setError(null);
      } else if (hawkerData.length > 0 && markers.length === 0) {
        // We had data but couldn't create markers
        setError('Found hawker centers but could not place them on map due to invalid coordinates.');
      } else {
        setError('No hawker centers found within the specified radius. Try increasing the search area.');
      }
      
    } catch (error: any) {
      console.error('Error finding nearby hawker centers:', error);
      
      // Clear any previous markers
      clearHawkerMarkers();
      
      // Extract more specific error information if available
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;
      
      if (statusCode === 404) {
        setError(`API endpoint not found. Please check the server is running.`);
      } else {
        setError(`API error: ${errorMessage}`);
      }
      
      // If no hawkers were found, clear any previous results
      setHawkerCenters([]);
      setShowingHawkers(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to clear hawker center markers from the map
  const clearHawkerMarkers = () => {
    hawkerMarkers.forEach(marker => marker.setMap(null));
    setHawkerMarkers([]);
    setShowingHawkers(false);
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
          
          {/* Hawker Centers Search */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="mb-2">
              <h3 className="font-medium mb-2">Find Nearby Food Options</h3>
              <div className="flex items-center mb-2">
                <span className="text-xs mr-2">Search radius (km):</span>
                <input 
                  type="number" 
                  min="0.1" 
                  max="5" 
                  step="0.1" 
                  value={hawkerRadius} 
                  onChange={(e) => setHawkerRadius(parseFloat(e.target.value))}
                  className="w-16 px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              {!showingHawkers ? (
                <button
                  onClick={findNearbyHawkers}
                  disabled={isLoading}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Show Hawker Centers'}
                </button>
              ) : (
                <button
                  onClick={clearHawkerMarkers}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Hide Hawker Centers
                </button>
              )}
            </div>
            
            {/* Hawker centers info */}
            {hawkerCenters.length > 0 ? (
              <div className="mt-2 bg-green-50 p-2 rounded text-sm">
                <p className="font-medium mb-1 text-green-800">
                  Found {hawkerCenters.length} hawker centers
                </p>
                <p className="text-xs text-green-700">
                  Click on a marker to see details and get directions
                </p>
              </div>
            ) : error ? (
              <div className="mt-2 bg-red-50 p-2 rounded text-sm">
                <p className="text-red-700">{error}</p>
              </div>
            ) : null}
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