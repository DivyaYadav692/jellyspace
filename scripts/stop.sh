#!/bin/bash

# Change to the application directory
cd /home/ubuntu/jellyspace

# Stop the application (example for pm2)
echo "Stopping application..."

# If using pm2
# pm2 stop "jellyspace"

# For a simple Node.js app or process (if not using pm2)
# pkill -f "node app.js"

# For Python Flask app (if you used `flask run`):
# pkill -f "flask run"
