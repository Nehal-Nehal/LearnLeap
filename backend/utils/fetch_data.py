import requests
import json
from pymongo import MongoClient
import random
from urllib.parse import quote_plus
from fetch_photos import scrape_image_from_url

# MongoDB connection
username = "tang0551"
password = "hUvvibJrWBYImwE0"
encoded_password = quote_plus(password)
client = MongoClient(f"mongodb+srv://{username}:{encoded_password}@cluster0.nl9y4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.get_database('SC2006_api_db')
institution_collection = db.Institution

# API endpoints
api_endpoints = {
    'general_info': 'https://data.gov.sg/api/action/datastore_search?resource_id=d_688b934f82c1059ed0a6993d2a829089&limit=1000',
    'subjects': 'https://data.gov.sg/api/action/datastore_search?resource_id=d_f1d144e423570c9d84dbc5102c2e664d&limit=1000',
    'distinctive_programs': 'https://data.gov.sg/api/action/datastore_search?resource_id=d_db1faeea02c646fa3abccfa5aba99214&limit=1000',
    'moe_programs': 'https://data.gov.sg/api/action/datastore_search?resource_id=d_b0697d22a7837a4eddf72efb66a36fc2&limit=1000',
    'cca': 'https://data.gov.sg/api/action/datastore_search?resource_id=d_9aba12b5527843afb0b2e8e4ed6ac6bd&limit=1000'
}

# Placeholder for school images
#school_image = "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80"

def fetch_data(url, endpoint_name):
    """
    Fetch data from API endpoint with pagination
    
    Args:
        url: Initial API endpoint URL
        endpoint_name: Name of the endpoint for tracking calls
    
    Returns:
        List of all records from all pages
    """
    all_records = []
    current_url = url
    call_count = 0
    
    while current_url:
        try:
            print(f"Fetching {endpoint_name} data, call #{call_count + 1}...")
            response = requests.get(current_url)
            response.raise_for_status()
            
            data = response.json()
            records = data['result']['records']
            all_records.extend(records)
            call_count += 1
            
            # Check if there are more records to fetch
            if '_links' in data['result'] and 'next' in data['result']['_links'] and records:
                # Get the next URL (it might be a relative path)
                next_path = data['result']['_links']['next']
                if next_path.startswith('/'):
                    # Convert relative path to absolute URL
                    current_url = f"https://data.gov.sg{next_path}"
                else:
                    current_url = next_path
            else:
                # No more data or no next link
                current_url = None
                
        except Exception as e:
            print(f"Error fetching data from {current_url}: {e}")
            current_url = None
    
    print(f"Completed fetching {endpoint_name} data. Made {call_count} API calls, retrieved {len(all_records)} records.")
    return all_records

def get_coordinates(address, postal_code):
    try:
        # OneMap API endpoint
        url = f"https://www.onemap.gov.sg/api/common/elastic/search?searchVal={postal_code}&returnGeom=Y&getAddrDetails=Y&pageNum=1"
        
        # Authorization header
        headers = {
            "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3ZWNjN2UxNDczOWMyYmJhYjYwMDgwMGI4YjRhNTVhYyIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC1uZXctMTYzMzc5OTU0Mi5hcC1zb3V0aGVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hcGkvdjIvdXNlci9wYXNzd29yZCIsImlhdCI6MTc0MzIyNjkwMywiZXhwIjoxNzQzNDg2MTAzLCJuYmYiOjE3NDMyMjY5MDMsImp0aSI6ImhDa0NsOXkyWGp6U09kZFEiLCJ1c2VyX2lkIjo2NjA1LCJmb3JldmVyIjpmYWxzZX0.srQuFlitttHdzur7NvBnMyUbU8eNj9Fok6-rciabBrg"
        }
        
        # Make the API request
        response = requests.get(url, headers=headers)
        data = response.json()
        
        # Check if results were found
        if data.get("found", 0) > 0 and len(data.get("results", [])) > 0:
            result = data["results"][0]
            lat = float(result["LATITUDE"])
            lng = float(result["LONGITUDE"])
            return lat, lng
        else:
            print(f"No results found for {address}, {postal_code}")
            return "", ""
            
    except Exception as e:
        print(f"Error fetching coordinates for {address}, {postal_code}: {e}")
        return "", ""

def main():
    # Fetch data from all endpoints
    print("Fetching data from APIs...")
    general_info_data = fetch_data(api_endpoints['general_info'], 'general_info')
    subjects_data = fetch_data(api_endpoints['subjects'], 'subjects')
    distinctive_programs_data = fetch_data(api_endpoints['distinctive_programs'], 'distinctive_programs')
    moe_programs_data = fetch_data(api_endpoints['moe_programs'], 'moe_programs')
    cca_data = fetch_data(api_endpoints['cca'], 'cca')
    
    print("Processing data...")
    
    # Group subjects by school
    school_subjects = {}
    for subject in subjects_data:
        school_name = subject.get('SCHOOL_NAME', '')
        if not school_name:
            continue
        
        if school_name not in school_subjects:
            school_subjects[school_name] = []
        
        subject_desc = subject.get('SUBJECT_DESC', '')
        if subject_desc and subject_desc not in school_subjects[school_name]:
            school_subjects[school_name].append(subject_desc)
    
    # Group distinctive programs by school
    school_distinctive_programs = {}
    for program in distinctive_programs_data:
        school_name = program.get('school_name', '')
        if not school_name:
            continue
        
        if school_name not in school_distinctive_programs:
            school_distinctive_programs[school_name] = []
        
        # Add ALP title if it exists and is not 'na'
        alp_title = program.get('alp_title', '')
        if alp_title and alp_title.lower() != 'na' and alp_title not in school_distinctive_programs[school_name]:
            school_distinctive_programs[school_name].append(alp_title)
        
        # Add LLP title 1 if it exists and is not 'na'
        llp_title1 = program.get('llp_title1', '')
        if llp_title1 and llp_title1.lower() != 'na' and llp_title1 not in school_distinctive_programs[school_name]:
            school_distinctive_programs[school_name].append(llp_title1)
        
        # Add LLP title 2 if it exists and is not 'na'
        llp_title2 = program.get('llp_title2', '')
        if llp_title2 and llp_title2.lower() != 'na' and llp_title2 not in school_distinctive_programs[school_name]:
            school_distinctive_programs[school_name].append(llp_title2)
    
    # Group MOE programs by school
    school_moe_programs = {}
    for program in moe_programs_data:
        school_name = program.get('school_name', '')
        if not school_name:
            continue
        
        if school_name not in school_moe_programs:
            school_moe_programs[school_name] = []
        
        moe_program = program.get('moe_programme_desc', '')
        if moe_program and moe_program not in school_moe_programs[school_name]:
            school_moe_programs[school_name].append(moe_program)
    
    # Group CCAs by school - only saving cca_generic_name as requested
    school_ccas = {}
    for cca in cca_data:
        school_name = cca.get('school_name', '')
        if not school_name:
            continue
        
        if school_name not in school_ccas:
            school_ccas[school_name] = []
        
        cca_name = cca.get('cca_generic_name', '')
        if cca_name and cca_name not in school_ccas[school_name]:
            school_ccas[school_name].append(cca_name)
    
    # Prepare data for MongoDB
    schools = []
    
    for school in general_info_data:
        school_name = school.get('school_name', '')
        if not school_name:
            continue
        
        # Get coordinates
        lat, lng = get_coordinates(school.get('address', ''), school.get('postal_code', ''))
        
        # Create vice principals array (keeping spelling as "vice_principles" as in the example)
        vice_principals = []
        for i in range(1, 7):  # Check all 6 VP fields
            vp_key = f'{"first" if i == 1 else "second" if i == 2 else "third" if i == 3 else "fourth" if i == 4 else "fifth" if i == 5 else "sixth"}_vp_name'
            vp_name = school.get(vp_key, '')
            if vp_name and vp_name.upper() != 'NA':
                vice_principals.append(vp_name)
        
        # Create mother tongue array
        mother_tongues = []
        for i in range(1, 4):  # Check all 3 mother tongue fields
            mt_key = f'mothertongue{i}_code'
            mt = school.get(mt_key, '')
            if mt and mt.upper() != 'NA':
                mother_tongues.append(mt)

        school_image = scrape_image_from_url(school_name, school.get('url_address', ''))
        if(school_image[1]):
            school_logo = school_image[1]
        else:
            school_logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACUCAMAAAAAoYNxAAAAP1BMVEXg4OB0dHTk5OTc3NxxcXF3d3eLi4uwsLCGhoajo6N+fn7Ozs6Tk5Orq6u8vLynp6eZmZnIyMjCwsK2trbU1NRni9K2AAABwUlEQVR4nO3ZW3OCMBCG4ZwPBBWR//9bmzgdRKy2d2w673PTZrz5ut1sICoFAAAAAAAAAAAAAAAAAMCRzOroJH9kVDnHS86XeC6qh9DGxjENXjun/ZDGaKWHNirWuBt+iMIrPSd3D/qt/e7S9ehUH9joa2Kfpluxxthym1JN7Xy0Ryd7x55awHBavkdF/bGcQvsjTkIz1xrXPpjKU+uaMrVGEVrn83Cv526zmXvth/mYTJ8tbeet1dycIza2Pbgcles9k512eU08pTStme8fyRt1tsYKax+b4FxYF6XuQSeum1uR/W2tpAlah8fq5iWWue698dGvz5HVMtYdeESqD8zV12nxyLiLbC51mFxlldnUqTCc30ee6z8hCouctU5ls36OrErSWlgzm9qsYTMT9pFtXY/CIu8i/rYW4DXiZi7/8LkAL42RQ8jCG2O3/dTuXVXi9mtDbn6bSeSQq0eJvmyb96nKEo+SdmC77YGdxzFvD2wn7sB+fSzaTgyhj0X9PXz2+Ijf4YuUUnN3r6s9Xgp8uHqRmrjHC67q2ts14s+XteLv8ru7Em+6++Kh6e7rHQAAAAAAAAAAAAAAAADAf/UFraIOZF5QafAAAAAASUVORK5CYII="
        
        # Prepare school data according to the expected format
        school_data = {
            "_id": school.get('_id', ''),
            "school_name": school_name,
            "official website": school.get('url_address', ''),
            "school_image": school_image,
            "latitude": lat,
            "longitude": lng,
            "address": school.get('address', ''),
            "postal_code": school.get('postal_code', ''),
            "telephone_no": school.get('telephone_no', ''),
            "telephone_no_2": school.get('telephone_no_2', ''),
            "fax_no": school.get('fax_no', ''),
            "fax_no_2": school.get('fax_no_2', ''),
            "email_address": school.get('email_address', ''),
            "mrt_desc": school.get('mrt_desc', ''),
            "bus_desc": school.get('bus_desc', ''),
            "principal": school.get('principal_name', ''),
            "vice_principles": vice_principals,
            "DGP _rea": school.get('dgp_code', ''),
            "zone": school.get('zone_code', ''),
            "school_type": school.get('type_code', ''),
            "school_level": school.get('mainlevel_code', ''),
            "mother_tongue": mother_tongues,
            "subjects": school_subjects.get(school_name, []),
            "school_distinctive_programmes": school_distinctive_programs.get(school_name, []),
            "MOE_programmes": school_moe_programs.get(school_name, []),
            "CCA": school_ccas.get(school_name, [])
        }
        
        schools.append(school_data)
    
    # Insert data into MongoDB
    if schools:
        print(f"Inserting {len(schools)} schools into MongoDB...")
        
        # Drop existing collection if needed
        institution_collection.drop()
        
        # Insert new data
        institution_collection.insert_many(schools)
        print(f"Successfully inserted {len(schools)} schools.")
    else:
        print("No schools data to insert.")

if __name__ == "__main__":
    main()