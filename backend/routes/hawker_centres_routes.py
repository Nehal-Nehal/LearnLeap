from flask import Blueprint, jsonify,request
from database import get_hawker_data
from math import radians, sin, cos, sqrt, atan2
from models.hawker_center import HawkerCenter, HawkerCenterRepository

hawker_summary = {}
hawker_bp = Blueprint("hawker", __name__)

@hawker_bp.route('/nearby-hawkers/<float:latitude>/<float:longitude>/<float:radius>', methods=['GET'])
@hawker_bp.route('/nearby-hawkers/<float:latitude>/<float:longitude>', methods=['GET'])
def find_nearby_hawkers(latitude, longitude, radius=1.0):
    """
    Find hawker centers near a specific location.
    
    Path parameters:
        latitude: Latitude of the reference point (required)
        longitude: Longitude of the reference point (required)
        radius: Search radius in kilometers (optional, default: 1.0)
        
    Returns:
        JSON response with nearby hawker centers
    """
    try:
        # Validate parameters
        if not latitude or not longitude:
            return jsonify({
                "status": "error",
                "message": "Latitude and longitude are required"
            }), 400
            
        # Validate radius
        if radius <= 0:
            return jsonify({
                "status": "error", 
                "message": "Radius must be a positive number"
            }), 400
            
        # Find nearby hawker centers using our repository
        nearby_centers = HawkerCenterRepository.find_nearby(latitude, longitude, radius)
        
        # Convert the results to a list of dictionaries for JSON serialization
        result = [center.to_dict() for center in nearby_centers]
        
        # Return the results
        return jsonify({
            "status": "success",
            "total": len(result),
            "data": result
        })
        
    except Exception as e:
        # Log the error for debugging
        print(f"Error in nearby-hawkers endpoint: {str(e)}")
        
        # Return a generic error message to the client
        return jsonify({
            "status": "error",
            "message": "An internal server error occurred"
        }), 500

@hawker_bp.route('/all-hawkers', methods=['GET'])
def get_all_hawkers():
    """
    Get all hawker centers.
    
    Returns:
        JSON response with all hawker centers
    """
    try:
        # Get all hawker centers from the repository
        all_centers = HawkerCenterRepository.get_all_hawker_centers()
        
        # Convert to dictionary for JSON response
        result = [center.to_dict() for center in all_centers]
        
        return jsonify({
            "status": "success",
            "total": len(result),
            "data": result
        })
        
    except Exception as e:
        print(f"Error getting all hawker centers: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Failed to retrieve hawker centers"
        }), 500