from bson.objectid import ObjectId
from enum import Enum


class InstitutionType(Enum):
    PRIMARY = "PRIMARY"
    SECONDARY = "SECONDARY"
    JUNIOR_COLLEGE = "JUNIOR COLLEGE"
    UNIVERSITY = "UNIVERSITY"
    POLYTECHNIC = "POLYTECHNIC"
    ITE = "ITE"
    OTHER = "OTHER"


class Institution:

    COLLECTION = 'Institution'

    def __init__(self, id=None, school_name=None, school_level=None, school_type=None, 
                 address=None, postal_code=None, zone=None, DGP_area=None,
                 latitude=None, longitude=None, telephone_no=None, telephone_no_2=None,
                 fax_no=None, fax_no_2=None, email_address=None, official_website=None,
                 principal=None, vice_principles=None, school_distinctive_programmes=None,
                 MOE_programmes=None, subjects=None, CCA=None, mother_tongue=None,
                 bus_desc=None, mrt_desc=None, school_image=None):
        
        self.id = id if id else str(ObjectId())
        self.school_name = school_name
        self.school_level = school_level
        self.school_type = school_type
        self.address = address
        self.postal_code = postal_code
        self.zone = zone
        self.DGP_area = DGP_area
        self.latitude = latitude
        self.longitude = longitude
        self.telephone_no = telephone_no
        self.telephone_no_2 = telephone_no_2
        self.fax_no = fax_no
        self.fax_no_2 = fax_no_2
        self.email_address = email_address
        self.official_website = official_website
        self.principal = principal
        self.vice_principles = vice_principles or []
        self.school_distinctive_programmes = school_distinctive_programmes or []
        self.MOE_programmes = MOE_programmes or []
        self.subjects = subjects or []
        self.CCA = CCA or []
        self.mother_tongue = mother_tongue or []
        self.bus_desc = bus_desc
        self.mrt_desc = mrt_desc
        self.school_image = school_image
        
    def to_dict(self):
        """Convert the Institution object to a dictionary for MongoDB storage"""
        return {
            "_id": ObjectId(self.id) if isinstance(self.id, str) else self.id,
            "school_name": self.school_name,
            "school_level": self.school_level.value if isinstance(self.school_level, InstitutionType) else self.school_level,
            "school_type": self.school_type,
            "address": self.address,
            "postal_code": self.postal_code,
            "zone": self.zone,
            "DGP _rea": self.DGP_area,  # Note the underscore in field name to match the DB format
            "latitude": self.latitude,
            "longitude": self.longitude,
            "telephone_no": self.telephone_no,
            "telephone_no_2": self.telephone_no_2,
            "fax_no": self.fax_no,
            "fax_no_2": self.fax_no_2,
            "email_address": self.email_address,
            "official website": self.official_website,  # Space in field name to match the DB format
            "principal": self.principal,
            "vice_principles": self.vice_principles,
            "school_distinctive_programmes": self.school_distinctive_programmes,
            "MOE_programmes": self.MOE_programmes,
            "subjects": self.subjects,
            "CCA": self.CCA,
            "mother_tongue": self.mother_tongue,
            "bus_desc": self.bus_desc,
            "mrt_desc": self.mrt_desc,
            "school_image": self.school_image
        }
    
    @staticmethod
    def from_dict(data):
        """Create an Institution object from a MongoDB document"""
        return Institution(
            id=str(data.get('_id')) if data.get('_id') else None,
            school_name=data.get('school_name'),
            school_level=data.get('school_level'),
            school_type=data.get('school_type'),
            address=data.get('address'),
            postal_code=data.get('postal_code'),
            zone=data.get('zone'),
            DGP_area=data.get('DGP _rea'),  # Note the underscore in field name from the DB
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            telephone_no=data.get('telephone_no'),
            telephone_no_2=data.get('telephone_no_2'),
            fax_no=data.get('fax_no'),
            fax_no_2=data.get('fax_no_2'),
            email_address=data.get('email_address'),
            official_website=data.get('official website'),  # Space in field name from the DB
            principal=data.get('principal'),
            vice_principles=data.get('vice_principles'),
            school_distinctive_programmes=data.get('school_distinctive_programmes'),
            MOE_programmes=data.get('MOE_programmes'),
            subjects=data.get('subjects'),
            CCA=data.get('CCA'),
            mother_tongue=data.get('mother_tongue'),
            bus_desc=data.get('bus_desc'),
            mrt_desc=data.get('mrt_desc'),
            school_image=data.get('school_image')
        )
        
    def save(self, db):
        """Save the institution to MongoDB"""
        institution_dict = self.to_dict()
        
        result = db.db[self.COLLECTION].insert_one(institution_dict)
        self.id = str(result.inserted_id)
        
        return self.id
    
    @staticmethod
    def find_all(db):
        """Get all institutions from the database"""
        result = list(db.db['Institution'].find({}))
    
        # Convert ObjectId to string for JSON serialization
        for institution in result:
            if '_id' in institution:
                institution['_id'] = str(institution['_id'])
    
        return result