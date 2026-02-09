#!/bin/bash

echo "===Password Strength Checker Setup==="

# Move into directory where this script is located
cd "$(dirname "$0")"

# ------------------------------
# 1. Create virtual environment
# ------------------------------
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
else
    echo "Virtual environment already exists."
fi

# ------------------------------
# 2. Activate venv
# ------------------------------
echo "Activating venv..."
source venv/bin/activate

# Move into app directory
cd password-checker || {
    echo "password-checker directory not found."
    exit 1
}

# ------------------------------
# 3. Install Python packages
# ------------------------------
echo "Installing required Python packages..."
pip install --upgrade pip
pip install -r requirements.txt

# ------------------------------
# 5. Confirm environment
# ------------------------------
echo "Setup complete!"
echo "You can now run the website:"
echo " ./run.sh"