#!/bin/bash

# Update package lists
sudo apt-get update

# Install curl if not already installed (required to install Node.js)
sudo apt-get install -y curl

# Install Node.js (if not already installed)
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install npm (if not installed already)
sudo apt-get install -y npm

# Install Angular CLI globally
sudo npm install -g @angular/cli

# Verify installation
ng --version
