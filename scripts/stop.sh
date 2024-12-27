#!/bin/bash

# Find and kill the running http-server process (if any)
kill $(lsof -t -i:80)

# Alternatively, if you used a different method to start the app, stop the appropriate process
# Example for Node.js application:
# pm2 stop <your-app-name>

# You can add more commands here to clean up or restart processes if needed
