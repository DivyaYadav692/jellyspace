#!/bin/bash

# Update the system and install necessary dependencies
echo "Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

# Install any required packages (e.g., Git, Node.js, etc.)
echo "Installing necessary dependencies..."
sudo apt-get install -y git
