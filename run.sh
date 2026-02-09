#!/bin/bash

echo "=== Running the Password Strength Checker Website ==="

cd "$(dirname "$0")"

# Activate virtual environment
if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
else
    echo "Virtual environment not found. Run setup.sh first."
    exit 1
fi

# Move into app directory
cd password-checker || {
    echo "password-checker directory not found."
    exit 1
}

#Run Flask app
echo "Starting Flask server..."
python3 app.py

