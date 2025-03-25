
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from pymongo import MongoClient
from bson.objectid import ObjectId
from firebase_admin import auth, credentials, initialize_app
import firebase_admin
import pandas as pd
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv("MONGODB_URI", "mongodb+srv://tang0551:hUvvibJrWBYImwE0@cluster0.nl9y4.mongodb.net/")
client = MongoClient(MONGO_URI)
db = client.get_database("learnleap")
institutions_collection = db.institutions
users_collection = db.users

# Initialize Firebase Admin SDK for backend auth verification
try:
    firebase_app = firebase_admin.get_app()
except ValueError:
    firebase_cred = credentials.Certificate("firebase-credentials.json")
    firebase_app = initialize_app(firebase_cred)

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "LearnLeap API is running"})

@app.route("/api/institutions", methods=["GET"])
def get_institutions():
    query = {}
    
    # Parse query parameters
    institution_type = request.args.get('type')
    search_query = request.args.get('query')
    
    if institution_type:
        query['type'] = institution_type
    
    if search_query:
        query['$or'] = [
            {'name': {'$regex': search_query, '$options': 'i'}},
            {'description': {'$regex': search_query, '$options': 'i'}}
        ]
    
    # Convert MongoDB cursor to list of dictionaries
    institutions = list(institutions_collection.find(query))
    
    # Convert ObjectId to string
    for institution in institutions:
        institution['_id'] = str(institution['_id'])
    
    return jsonify(institutions)

@app.route("/api/institutions/<institution_id>", methods=["GET"])
def get_institution(institution_id):
    try:
        institution = institutions_collection.find_one({"_id": ObjectId(institution_id)})
        if institution:
            institution['_id'] = str(institution['_id'])
            return jsonify(institution)
        return jsonify({"error": "Institution not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/users/register", methods=["POST"])
def register_user():
    try:
        data = request.json
        
        # Check if user already exists
        existing_user = users_collection.find_one({"email": data["email"]})
        if existing_user:
            return jsonify({"error": "User already exists"}), 400
        
        # Insert new user
        new_user = {
            "name": data["name"],
            "email": data["email"],
            "institution": data.get("institution", ""),
            "role": data.get("role", "user"),
            "firebase_uid": data["uid"],
            "created_at": pd.Timestamp.now().isoformat()
        }
        
        result = users_collection.insert_one(new_user)
        new_user["_id"] = str(result.inserted_id)
        
        return jsonify({"message": "User registered successfully", "user": new_user}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/users/profile", methods=["GET"])
def get_user_profile():
    try:
        # Get the Firebase ID token from the Authorization header
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Invalid authorization header"}), 401
        
        id_token = auth_header.split("Bearer ")[1]
        
        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]
        
        # Get the user from the database
        user = users_collection.find_one({"firebase_uid": uid})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        user["_id"] = str(user["_id"])
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
