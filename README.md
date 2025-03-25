
# LearnLeap - Educational Institution Search System

LearnLeap is a comprehensive search system for educational institutions in Singapore, designed to help students and parents discover schools, colleges, and universities that meet their specific requirements.

## Live Demo

You can access the live demo of the project at [LearnLeap App](https://learnleap-app.web.app) (Note: This link is a placeholder and needs to be updated when deployed).

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
- Firebase project with authentication enabled

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

## Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication in the Authentication section
3. Copy your Firebase configuration from Project Settings
4. Update the `firebaseConfig` object in `src/lib/firebase.ts` with your own Firebase project details
5. For backend auth verification, generate a new private key for your service account and save it as `firebase-credentials.json` in the backend directory

## MongoDB Configuration

1. Create a MongoDB Atlas account and set up a new cluster
2. Create a database named "learnleap"
3. Set up the connection string as an environment variable for the backend

## Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `PORT`: (Optional) Port for the Flask server (default: 5000)

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/institutions`: Get a list of all institutions, with optional filtering
- `GET /api/institutions/:id`: Get details of a specific institution
- `POST /api/users/register`: Register a new user
- `GET /api/users/profile`: Get the profile of the authenticated user

## Deployment

### Frontend
The frontend can be deployed to Firebase Hosting:

```sh
npm run build
firebase deploy --only hosting
```

### Backend
The backend can be deployed to a platform like Heroku, Google Cloud Run, or AWS:

```sh
# Example for Heroku
heroku create
git push heroku main
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Data provided by [data.gov.sg](https://data.gov.sg)
- Icons from [Lucide Icons](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
