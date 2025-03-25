
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import pymongo
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
def get_mongodb_connection():
    # In production, use environment variables for the connection string
    mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    client = pymongo.MongoClient(mongo_uri)
    return client.get_database("learnleap")

@app.route("/api/institutions", methods=["GET"])
def get_institutions():
    try:
        db = get_mongodb_connection()
        institutions = list(db.institutions.find({}, {"_id": 0}))
        return jsonify({
            "status": "success",
            "data": institutions
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/api/institutions/<institution_id>", methods=["GET"])
def get_institution(institution_id):
    try:
        db = get_mongodb_connection()
        institution = db.institutions.find_one({"id": institution_id}, {"_id": 0})
        if not institution:
            return jsonify({
                "status": "error",
                "message": "Institution not found"
            }), 404
        return jsonify({
            "status": "success",
            "data": institution
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/api/institutions/search", methods=["POST"])
def search_institutions():
    try:
        filters = request.json
        query = {}
        
        # Build query based on filters
        if filters.get("query"):
            query["name"] = {"$regex": filters["query"], "$options": "i"}
        
        if filters.get("type") and len(filters["type"]) > 0:
            query["type"] = {"$in": filters["type"]}
            
        if filters.get("location") and len(filters["location"]) > 0:
            query["location"] = {"$in": filters["location"]}
        
        db = get_mongodb_connection()
        institutions = list(db.institutions.find(query, {"_id": 0}))
        
        return jsonify({
            "status": "success",
            "data": institutions,
            "count": len(institutions)
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/api/user/register", methods=["POST"])
def register_user():
    try:
        user_data = request.json
        db = get_mongodb_connection()
        
        # Check if user already exists
        existing_user = db.users.find_one({"email": user_data["email"]})
        if existing_user:
            return jsonify({
                "status": "error",
                "message": "User already exists"
            }), 400
        
        # Insert new user
        db.users.insert_one(user_data)
        
        return jsonify({
            "status": "success",
            "message": "User registered successfully"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/api/data/sync", methods=["POST"])
def sync_data_from_gov():
    # This endpoint would fetch data from data.gov.sg and sync to our database
    # For now, it's a placeholder
    return jsonify({
        "status": "success",
        "message": "Data sync initiated"
    })

if __name__ == "__main__":
    app.run(debug=True)
