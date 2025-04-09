
# LearnLeap - Educational Institution Search System

LearnLeap is a comprehensive search system for educational institutions in Singapore, designed to help students and parents discover schools, colleges, and universities that meet their specific requirements.


## Features

- **Institution Search**: Find educational institutions based on various criteria
- **Interactive Map**: View institution locations and calculate distances from your location
- **User Authentication**: Sign in with Google for a personalized experience
- **Institution Registration**: Form for educational institutions to register
- **Comprehensive Database**: Information on universities, polytechnics, junior colleges, secondary and primary schools
- **Data Integration**: Uses data.gov.sg API to fetch educational institution data

## Project Structure

This project is organized into two main directories:
- `/frontend` - React.js application
- `/backend` - Python API with MongoDB integration

## Technologies Used

### Frontend
- React with TypeScript
- Vite for building
- Tailwind CSS for styling
- shadcn/ui for UI components
- Firebase Authentication for Google Sign-in
- React Router for navigation
- React Query for data fetching

### Backend
- Python Flask for API
- MongoDB for database storage
- Firebase Admin SDK for authentication verification
- Integration with data.gov.sg API

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- Python 3.8+
- MongoDB account

### Frontend Setup

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend Setup

```sh
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set MongoDB connection string environment variable
# On Unix/Linux/Mac:
export MONGODB_URI="your_mongodb_connection_string"
# On Windows:
set MONGODB_URI="your_mongodb_connection_string"

# Run the data import script (fetches data from data.gov.sg)
python import_data.py

# Start the API server
python app.py
```
## MongoDB Configuration

1. Create a MongoDB Atlas account and set up a new cluster
2. Create a database named "learnleap"
3. Set up the connection string as an environment variable for the backend

## Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `PORT`: (Optional) Port for the Flask server (default: 5000)


## Acknowledgements

- Data provided by [data.gov.sg](https://data.gov.sg)
- Icons from [Lucide Icons](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
