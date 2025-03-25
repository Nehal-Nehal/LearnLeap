
# LearnLeap - Educational Institution Search System

LearnLeap is a comprehensive search system for educational institutions in Singapore, designed to help students and parents discover schools, colleges, and universities that meet their specific requirements.

## Project Structure

This project is organized into two main directories:
- `/frontend` - React.js application
- `/backend` - Python API with MongoDB integration

## Frontend (React)

The frontend is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Firebase Authentication (Google Sign-in)

### Running the Frontend

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Backend (Python)

The backend API is built with:
- Python Flask
- MongoDB for database
- Integration with data.gov.sg for educational institution data

### Setup Backend

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

## Authentication

The application uses Firebase Authentication for Google Sign-in. Users can sign in with their Google accounts to access personalized features.

## Features

- Comprehensive search for educational institutions in Singapore
- Filtering by institution type, location, and other criteria
- Interactive map view of institution locations
- Institution registration system
- User authentication via Google
- Integration with data.gov.sg for educational institution data
- MongoDB backend for data storage

## MongoDB Configuration

The backend requires a MongoDB database. The connection string should be set as an environment variable named `MONGODB_URI`. For local development, you can use a local MongoDB instance.

## Firebase Configuration

The frontend requires Firebase configuration for authentication. Update the `firebaseConfig` object in `src/lib/firebase.ts` with your own Firebase project details.

```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/529b5277-1183-4c3f-a223-c472d92af9d0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
