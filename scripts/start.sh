#!/bin/bash

# Change to the application directory
cd /home/ubuntu/jellyspace

# Example: Start a Node.js app using pm2
echo "Starting application..."

# If you are using pm2 to manage your Node.js app
# pm2 start app.js --name "jellyspace"

# For a simple Node.js app (if you don't use pm2)
# node app.js &

# For Python Flask app (example)
# FLASK_APP=app.py flask run --host=0.0.0.0

# For any other app, modify according to the method you use to run it
