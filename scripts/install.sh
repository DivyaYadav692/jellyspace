#!/bin/bash

# Navigate to the app directory (assuming this is where the package.json is located)
cd /home/ubuntu/jellyspace/jellyspace

# Install application dependencies
npm install --legacy-peer-deps

# Build the Angular project for production (optional: if you want to build the project here)
ng build --configuration production

# You can add any additional setup steps here, such as setting environment variables, etc.
