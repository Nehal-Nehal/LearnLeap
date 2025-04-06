import math
from typing import Dict, Any, List, Optional
from database import get_hawker_data

# Global variable to cache hawker center data
hawker_summary = {}

class HawkerCenter:
    """
    Class representing a Hawker Center in Singapore.
    Contains location, address information, and methods to interact with hawker center data.
    """
    
    def __init__(self, name: str, block: str, building: str, postal_code: str, 
                 street: str, latitude: float, longitude: float):
        """
        Initialize a new HawkerCenter object.
        
        Args:
            name: Name of the hawker center
            block: Block number
            building: Building name
            postal_code: Postal code
            street: Street name
            latitude: Latitude coordinate
            longitude: Longitude coordinate
        """
        self.name = name
        self.block = block
        self.building = building
        self.postal_code = postal_code
        self.street = street
        self.latitude = latitude
        self.longitude = longitude
        self._distance: Optional[float] = None  # Distance from a reference point, initially None
    
    @classmethod
    def from_dict(cls, name: str, data: Dict[str, Any]) -> 'HawkerCenter':
        """
        Create a HawkerCenter object from a dictionary.
        
        Args:
            name: Name of the hawker center
            data: Dictionary containing address and location information
            
        Returns:
            A new HawkerCenter instance
        """
        try:
            address = data.get('address', {})
            location = data.get('location', {})
            
            return cls(
                name=name,
                block=address.get('block', ''),
                building=address.get('building', ''),
                postal_code=address.get('postal_code', ''),
                street=address.get('street', ''),
                latitude=float(location.get('latitude', 0.0)),
                longitude=float(location.get('longitude', 0.0))
            )
        except (ValueError, TypeError, KeyError) as e:
            raise ValueError(f"Error creating HawkerCenter from data: {e}")
    
    @property
    def full_address(self) -> str:
        """
        Generate a formatted full address string.
        
        Returns:
            String representing the full address
        """
        components = []
        
        if self.block:
            components.append(f"Block {self.block}")
        
        if self.building:
            components.append(self.building)
        
        if self.street:
            components.append(self.street)
        
        if self.postal_code:
            components.append(f"Singapore {self.postal_code}")
        
        return ", ".join(components)
    
    @property
    def distance(self) -> Optional[float]:
        """
        Get the calculated distance to this hawker center.
        
        Returns:
            Distance in kilometers, or None if not calculated
        """
        return self._distance
    
    def calculate_distance(self, lat: float, lng: float) -> float:
        """
        Calculate the distance from a given coordinate to this hawker center
        using the Haversine formula.
        
        Args:
            lat: Latitude of the reference point
            lng: Longitude of the reference point
            
        Returns:
            Distance in kilometers
        """
        # Convert decimal degrees to radians
        lat1, lon1, lat2, lon2 = map(math.radians, [lat, lng, self.latitude, self.longitude])
        
        # Haversine formula
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        r = 6371  # Radius of earth in kilometers
        
        # Store the distance for later use
        self._distance = round(c * r, 2)
        return self._distance
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert the HawkerCenter object to a dictionary for JSON serialization.
        
        Returns:
            Dictionary representation of the hawker center
        """
        return {
            "name": self.name,
            "address": {
                "block": self.block,
                "building": self.building,
                "postal_code": self.postal_code,
                "street": self.street
            },
            "location": {
                "latitude": self.latitude,
                "longitude": self.longitude
            },
            "distance": self._distance,
            "full_address": self.full_address
        }

class HawkerCenterRepository:
    """
    Repository class for accessing and filtering hawker center data.
    """
    
    @staticmethod
    def get_all_hawker_centers() -> List[HawkerCenter]:
        """
        Get all hawker centers from the database.
        Uses the global hawker_summary cache to avoid repeated database calls.
        
        Returns:
            List of HawkerCenter objects
        """
        global hawker_summary
        
        try:
            # Check if we need to load the data from database
            if not hawker_summary:
                # Use the database function to get hawker data
                hawker_summary = get_hawker_data()
            
            # Convert the cached data to HawkerCenter objects
            hawker_centers = []
            for name, data in hawker_summary.items():
                try:
                    hawker_center = HawkerCenter.from_dict(name, data)
                    hawker_centers.append(hawker_center)
                except ValueError as e:
                    print(f"Skipping invalid hawker center '{name}': {e}")
            
            return hawker_centers
            
        except Exception as e:
            print(f"Error loading hawker centers: {e}")
            return []
    
    @staticmethod
    def find_nearby(latitude: float, longitude: float, radius: float = 1.0) -> List[HawkerCenter]:
        """
        Find hawker centers within the specified radius of a location.
        
        Args:
            latitude: Latitude of the reference point
            longitude: Longitude of the reference point
            radius: Search radius in kilometers, default is 1.0 km
            
        Returns:
            List of nearby HawkerCenter objects sorted by distance
        """
        # Get all hawker centers
        all_centers = HawkerCenterRepository.get_all_hawker_centers()
        nearby_centers = []
        
        # Filter centers by distance
        for center in all_centers:
            distance = center.calculate_distance(latitude, longitude)
            if distance <= radius:
                nearby_centers.append(center)
        
        # Sort by distance
        nearby_centers.sort(key=lambda x: x.distance or float('inf'))
        
        return nearby_centers