import os
import json
import requests
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
from routes.institutions import institutions_bp
from routes.hawker_centres_routes import hawker_bp
from routes.login import login_bp, init_mongo as init_login_mongo
from routes.location_router import location_bp
from routes.user_routes import user_bp, init_mongo as init_user_mongo
from database import init_mongo as init_db_mongo
from database import init_db
from routes.Institution_routes import institution_bp, init_mongo as init_institution_mongo
from routes.Institution_routes import institution_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:8080"}}, supports_credentials=True)

# MongoDB connection
username = os.environ.get("MONGO_USERNAME")
password = os.environ.get("MONGO_PASSWORD")

mongo_uri = f"mongodb+srv://{username}:{password}@cluster0.nl9y4.mongodb.net/SC2006_api_db?retryWrites=true&w=majority&appName=Cluster0"

app.config["MONGO_URI"] = mongo_uri
app.config["JWT_SECRET_KEY"] = "SC2006"  # Replace with a strong key
mongo = PyMongo(app)
jwt = JWTManager(app)
init_login_mongo(mongo)
init_db_mongo(mongo)
init_institution_mongo(mongo)
init_user_mongo(mongo)

#Initialise Database
db = init_db()

# Register Blueprints
app.register_blueprint(login_bp)
app.register_blueprint(institutions_bp)
app.register_blueprint(hawker_bp)
app.register_blueprint(location_bp)
app.register_blueprint(institution_bp)
app.register_blueprint(user_bp)

institutions_collection = db.institutions
users_collection = db.users
hawker_collection = db.hawker_centres

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

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
