
import os
import pandas as pd
import json
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import uuid
import random

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv("MONGODB_URI", "mongodb+srv://tang0551:hUvvibJrWBYImwE0@cluster0.nl9y4.mongodb.net/")
client = MongoClient(MONGO_URI)
db = client.get_database("learnleap")
institutions_collection = db.institutions

# URLs for data.gov.sg datasets
DATASETS = {
    "universities": "https://data.gov.sg/api/action/datastore_search?resource_id=9326ca53-927a-4a39-9f4d-9eb0a35f2a5a&limit=100",
    "polytechnics": "https://data.gov.sg/api/action/datastore_search?resource_id=19307d72-39ce-4d2f-a9a1-76eeba4eeed5&limit=100",
    "primary_schools": "https://data.gov.sg/api/action/datastore_search?resource_id=ede26d32-01af-4228-b1ed-f05c45a1d8ee&limit=100",
    "secondary_schools": "https://data.gov.sg/api/action/datastore_search?resource_id=ede26d32-01af-4228-b1ed-f05c45a1d8ee&limit=100"
}

# Generate mock data for fields not in the data.gov.sg datasets
def generate_mock_institution_data(name, institution_type, location="Singapore"):
    # Generate random coordinates within Singapore
    latitude = 1.3521 + (random.random() - 0.5) * 0.1
    longitude = 103.8198 + (random.random() - 0.5) * 0.2
    
    # Generate random rankings for universities
    ranking = None
    if institution_type == "University":
        ranking = random.randint(1, 500)
    
    # Generate mock data
    return {
        "id": str(uuid.uuid4()),
        "name": name,
        "type": institution_type,
        "location": location,
        "latitude": latitude,
        "longitude": longitude,
        "ranking": ranking,
        "entryRequirements": generate_entry_requirements(institution_type),
        "coursesOffered": generate_courses_offered(institution_type),
        "coCurricularActivities": generate_ccas(),
        "specialPrograms": generate_special_programs(institution_type),
        "description": f"{name} is a leading {institution_type.lower()} in Singapore offering a wide range of programs and activities.",
        "imageUrl": generate_image_url(institution_type)
    }

def generate_entry_requirements(institution_type):
    if institution_type == "University":
        return ["A-Level results", "Polytechnic Diploma", "International Baccalaureate"]
    elif institution_type == "Junior College":
        return ["O-Level results", "Secondary school results"]
    elif institution_type == "Polytechnic":
        return ["O-Level results", "N-Level results with relevant criteria"]
    elif institution_type == "Secondary School":
        return ["Primary School Leaving Examination (PSLE) results"]
    elif institution_type == "Primary School":
        return ["Registration", "Proximity to school"]
    else:
        return ["General admission requirements"]

def generate_courses_offered(institution_type):
    courses = []
    if institution_type == "University":
        courses = ["Computer Science", "Business Administration", "Engineering", "Medicine", "Arts and Social Sciences"]
    elif institution_type == "Junior College":
        courses = ["Science stream", "Arts stream", "Hybrid combinations"]
    elif institution_type == "Polytechnic":
        courses = ["Information Technology", "Business Studies", "Engineering", "Design", "Health Sciences"]
    elif institution_type == "Secondary School":
        courses = ["Express stream", "Normal Academic stream", "Normal Technical stream"]
    elif institution_type == "Primary School":
        courses = ["Standard curriculum", "Gifted Education Programme (selected schools)"]
    return random.sample(courses, min(3, len(courses)))

def generate_ccas():
    ccas = ["Sports", "Performing Arts", "Clubs and Societies", "Uniformed Groups"]
    return random.sample(ccas, random.randint(2, 4))

def generate_special_programs(institution_type):
    if institution_type == "University":
        programs = ["Honors Program", "Exchange Program", "Research Opportunities", "Internship Program"]
    elif institution_type == "Junior College":
        programs = ["Talent Development Program", "Special programs"]
    elif institution_type == "Polytechnic":
        programs = ["Diploma Plus", "Overseas Exposure Program"]
    elif institution_type == "Secondary School":
        programs = ["Applied Learning Program", "Learning for Life Program"]
    elif institution_type == "Primary School":
        programs = ["Programme for Active Learning", "Holistic Assessment"]
    else:
        programs = ["Special Program 1", "Special Program 2"]
    return random.sample(programs, min(2, len(programs)))

def generate_image_url(institution_type):
    # Sample image URLs based on institution type
    university_images = [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
        "https://images.unsplash.com/photo-1562774053-701939374585",
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b"
    ]
    school_images = [
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
        "https://images.unsplash.com/photo-1588072432836-e10032774350",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    ]
    
    if institution_type in ["University", "Junior College", "Polytechnic"]:
        return random.choice(university_images)
    else:
        return random.choice(school_images)

def fetch_and_process_data():
    all_institutions = []
    
    # Fetch data from data.gov.sg APIs
    try:
        print("Fetching data from data.gov.sg...")
        
        # Process university data
        response = requests.get(DATASETS["universities"])
        if response.status_code == 200:
            data = response.json()
            records = data["result"]["records"]
            for record in records:
                institution = generate_mock_institution_data(
                    name=record.get("university", "Unknown University"),
                    institution_type="University"
                )
                all_institutions.append(institution)
            print(f"Added {len(records)} universities")
        
        # Since we don't have all datasets, we'll generate some mock data
        # for other institution types
        
        # Generate mock Junior Colleges
        jc_names = [
            "Raffles Junior College", "Hwa Chong Institution", "Victoria Junior College",
            "National Junior College", "Anglo-Chinese Junior College", "Temasek Junior College",
            "St. Andrew's Junior College", "Catholic Junior College"
        ]
        for name in jc_names:
            institution = generate_mock_institution_data(
                name=name,
                institution_type="Junior College"
            )
            all_institutions.append(institution)
        print(f"Added {len(jc_names)} junior colleges")
        
        # Generate mock Polytechnics
        poly_names = [
            "Singapore Polytechnic", "Ngee Ann Polytechnic", "Temasek Polytechnic",
            "Nanyang Polytechnic", "Republic Polytechnic"
        ]
        for name in poly_names:
            institution = generate_mock_institution_data(
                name=name,
                institution_type="Polytechnic"
            )
            all_institutions.append(institution)
        print(f"Added {len(poly_names)} polytechnics")
        
        # Generate mock Secondary Schools
        secondary_names = [
            "Raffles Institution", "Hwa Chong Institution", "Victoria School",
            "Anglo-Chinese School (Independent)", "Methodist Girls' School",
            "St. Joseph's Institution", "Cedar Girls' Secondary School"
        ]
        for name in secondary_names:
            institution = generate_mock_institution_data(
                name=name,
                institution_type="Secondary School"
            )
            all_institutions.append(institution)
        print(f"Added {len(secondary_names)} secondary schools")
        
        # Generate mock Primary Schools
        primary_names = [
            "Nanyang Primary School", "Rosyth School", "Henry Park Primary School",
            "Anglo-Chinese School (Primary)", "Tao Nan School", "CHIJ Primary",
            "Raffles Girls' Primary School"
        ]
        for name in primary_names:
            institution = generate_mock_institution_data(
                name=name,
                institution_type="Primary School"
            )
            all_institutions.append(institution)
        print(f"Added {len(primary_names)} primary schools")
        
        # Import the data into MongoDB
        if all_institutions:
            # Clear existing data
            institutions_collection.delete_many({})
            
            # Insert new data
            institutions_collection.insert_many(all_institutions)
            print(f"Imported {len(all_institutions)} institutions into MongoDB")
            
            # Save a local copy as JSON
            with open("institutions_data.json", "w") as f:
                json.dump(all_institutions, f, indent=2)
            print("Saved local copy of data to institutions_data.json")
    
    except Exception as e:
        print(f"Error fetching or processing data: {e}")

if __name__ == "__main__":
    fetch_and_process_data()
