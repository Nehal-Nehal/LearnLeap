
import requests
import json
import os
import uuid
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
def get_mongodb_connection():
    # In production, use environment variables for the connection string
    mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    client = MongoClient(mongo_uri)
    return client.get_database("learnleap")

def fetch_schools_data():
    """
    Fetches school data from data.gov.sg
    """
    url = "https://data.gov.sg/api/action/datastore_search?resource_id=ede26d32-01af-4228-b1ed-f05c45a1d8ee&limit=1000"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['result']['records']
    return []

def prepare_institution_data(school_data):
    """
    Transforms raw school data into our application's format
    """
    institutions = []
    
    for school in school_data:
        # Generate an image url based on the school name
        image_url = f"https://source.unsplash.com/featured/?school,education,{school.get('school_name', '').replace(' ', '%20')}"
        
        # Map the school type to our categories
        school_type = "School"
        if "PRIMARY" in school.get('mainlevel_code', ''):
            school_type = "Primary School"
        elif "SECONDARY" in school.get('mainlevel_code', ''):
            school_type = "Secondary School"
        elif "JUNIOR" in school.get('mainlevel_code', ''):
            school_type = "Junior College"
        
        # Create our institution object
        institution = {
            "id": str(uuid.uuid4()),
            "name": school.get('school_name', 'Unknown School'),
            "type": school_type,
            "location": school.get('address', 'Singapore'),
            "latitude": float(school.get('latitude', 1.3521)),
            "longitude": float(school.get('longitude', 103.8198)),
            "ranking": None,  # Ranking not available from data.gov.sg
            "entryRequirements": [],
            "coursesOffered": [],
            "coCurricularActivities": school.get('co_curricular_activities', '').split(',') if school.get('co_curricular_activities') else [],
            "specialPrograms": [],
            "description": school.get('school_name', 'Unknown School'),
            "imageUrl": image_url
        }
        
        institutions.append(institution)
    
    return institutions

def add_universities_and_polytechnics():
    """
    Add manually some universities and polytechnics (not available in data.gov.sg API)
    """
    universities = [
        {
            "id": str(uuid.uuid4()),
            "name": "National University of Singapore",
            "type": "University",
            "location": "21 Lower Kent Ridge Rd, Singapore 119077",
            "latitude": 1.2966,
            "longitude": 103.7764,
            "ranking": 1,
            "entryRequirements": ["A-Levels", "Polytechnic Diploma", "International Baccalaureate"],
            "coursesOffered": ["Computer Science", "Business", "Law", "Medicine", "Engineering"],
            "coCurricularActivities": ["Sports", "Arts", "Community Service"],
            "specialPrograms": ["Double Degree", "Honours Program", "Exchange Program"],
            "description": "The National University of Singapore (NUS) is a comprehensive research university located in Singapore.",
            "imageUrl": "https://source.unsplash.com/featured/?university,singapore,nus"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Nanyang Technological University",
            "type": "University",
            "location": "50 Nanyang Ave, Singapore 639798",
            "latitude": 1.3483,
            "longitude": 103.6831,
            "ranking": 2,
            "entryRequirements": ["A-Levels", "Polytechnic Diploma", "International Baccalaureate"],
            "coursesOffered": ["Engineering", "Business", "Science", "Humanities", "Art & Design"],
            "coCurricularActivities": ["Sports", "Arts", "Community Service"],
            "specialPrograms": ["Double Degree", "Honours Program", "Exchange Program"],
            "description": "Nanyang Technological University (NTU) is a research-intensive public university in Singapore.",
            "imageUrl": "https://source.unsplash.com/featured/?university,singapore,ntu"
        }
    ]
    
    polytechnics = [
        {
            "id": str(uuid.uuid4()),
            "name": "Singapore Polytechnic",
            "type": "Polytechnic",
            "location": "500 Dover Rd, Singapore 139651",
            "latitude": 1.3099,
            "longitude": 103.7775,
            "ranking": None,
            "entryRequirements": ["O-Levels", "NITEC"],
            "coursesOffered": ["Engineering", "IT", "Business", "Media", "Design"],
            "coCurricularActivities": ["Sports", "Arts", "Clubs"],
            "specialPrograms": ["Diplomas", "Special Interest Groups"],
            "description": "Singapore Polytechnic (SP) is a post-secondary education institution in Singapore.",
            "imageUrl": "https://source.unsplash.com/featured/?polytechnic,singapore,education"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Ngee Ann Polytechnic",
            "type": "Polytechnic",
            "location": "535 Clementi Rd, Singapore 599489",
            "latitude": 1.3327,
            "longitude": 103.7743,
            "ranking": None,
            "entryRequirements": ["O-Levels", "NITEC"],
            "coursesOffered": ["Engineering", "Business", "Film", "Health Sciences", "IT"],
            "coCurricularActivities": ["Sports", "Arts", "Clubs"],
            "specialPrograms": ["Diplomas", "Special Interest Groups"],
            "description": "Ngee Ann Polytechnic is a post-secondary education institution in Singapore.",
            "imageUrl": "https://source.unsplash.com/featured/?polytechnic,singapore,school"
        }
    ]
    
    return universities + polytechnics

def main():
    # Get MongoDB connection
    db = get_mongodb_connection()
    
    # Fetch schools data from data.gov.sg
    print("Fetching schools data from data.gov.sg...")
    schools_data = fetch_schools_data()
    print(f"Fetched {len(schools_data)} schools")
    
    # Transform data to our format
    print("Transforming data...")
    institutions = prepare_institution_data(schools_data)
    
    # Add universities and polytechnics
    print("Adding universities and polytechnics...")
    institutions.extend(add_universities_and_polytechnics())
    
    # Clear existing data
    print("Clearing existing institutions data...")
    db.institutions.delete_many({})
    
    # Insert new data
    print(f"Inserting {len(institutions)} institutions...")
    db.institutions.insert_many(institutions)
    
    print("Data import completed successfully!")

if __name__ == "__main__":
    main()
