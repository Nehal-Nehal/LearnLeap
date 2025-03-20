
# LearnLeap Backend API

This directory contains the Python backend API for LearnLeap, designed to integrate with data.gov.sg and provide educational institution data.

## Setup

1. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```
pip install -r requirements.txt
```

3. Start the API server:
```
python app.py
```

## API Endpoints

The following endpoints will be implemented:

- `GET /api/institutions` - Get all educational institutions
- `GET /api/institutions/:id` - Get details of a specific institution
- `GET /api/institutions/types` - Get all institution types
- `GET /api/institutions/locations` - Get all institution locations
- `POST /api/institutions/search` - Search institutions with filters

## Data Source

Data will be sourced from data.gov.sg APIs for educational institutions in Singapore, including:
- Primary Schools
- Secondary Schools
- Junior Colleges
- Polytechnics
- Universities (public and private)

## Authentication

The API will use token-based authentication to secure endpoints. Tokens will be validated against Firebase Authentication.
