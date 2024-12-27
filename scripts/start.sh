#!/bin/bash

# Navigate to the built files directory (assuming 'dist' is the build directory)
cd /home/ubuntu/jellyspace/jellyspace/dist/jellyspace

# Install http-server globally (if not already installed)
npm install -g http-server

# Start the server
http-server -p 80
