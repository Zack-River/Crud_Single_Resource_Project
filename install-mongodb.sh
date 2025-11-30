#!/bin/bash

# MongoDB Installation Script for Ubuntu/WSL

echo "📦 Installing MongoDB Community Edition..."
echo ""

# Import MongoDB GPG key
echo "Step 1: Importing MongoDB GPG key..."
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Add MongoDB repository
echo "Step 2: Adding MongoDB repository..."
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
echo "Step 3: Updating package database..."
sudo apt-get update

# Install MongoDB
echo "Step 4: Installing MongoDB..."
sudo apt-get install -y mongodb-org

# Create data directory
echo "Step 5: Creating data directory..."
sudo mkdir -p /data/db
sudo chown -R $USER:$USER /data/db

echo ""
echo "✅ MongoDB installation complete!"
echo ""
echo "To start MongoDB, run: sudo systemctl start mongod"
echo "To enable MongoDB on boot: sudo systemctl enable mongod"
echo "To check status: sudo systemctl status mongod"
