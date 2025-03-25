
#!/bin/bash
# Setup script for LearnLeap development environment

# Frontend setup
echo "Setting up frontend dependencies..."
npm install

# Backend setup
echo "Setting up backend environment..."
cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python -m venv venv

# Activate virtual environment based on OS
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "Activating virtual environment (Windows)..."
    source venv/Scripts/activate
else
    echo "Activating virtual environment (Unix)..."
    source venv/bin/activate
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Import data
echo "Importing data from data.gov.sg..."
python import_data.py

echo "Setup complete!"
echo ""
echo "To start the frontend server, run: npm run dev"
echo "To start the backend server, run: cd backend && python app.py"
echo ""
echo "Make sure to set up your MongoDB connection string environment variable:"
echo "export MONGODB_URI=\"your_mongodb_connection_string\""
echo ""
echo "Also ensure your Firebase configuration in src/lib/firebase.ts is correct and"
echo "that you have placed firebase-credentials.json in the backend directory."
