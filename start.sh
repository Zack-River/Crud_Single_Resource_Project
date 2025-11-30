#!/bin/bash

# MEAN Stack CRUD Application - Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting MEAN Stack CRUD Application..."
echo ""

# Check if we're in the correct directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the Crud_Single_Resource directory"
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running"
    echo "Starting MongoDB..."
    sudo service mongod start
    if [ $? -ne 0 ]; then
        echo "❌ Failed to start MongoDB"
        echo "Please start MongoDB manually: sudo service mongod start"
        exit 1
    fi
    echo "✅ MongoDB started"
    echo ""
fi

# Start backend in background
echo "🔧 Starting backend server on port 3000..."
cd backend
npm start &
BACKEND_PID=$!
echo "✅ Backend running (PID: $BACKEND_PID)"
echo ""

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend server on port 4200..."
cd ../frontend
npm start

# If frontend is stopped, also stop backend
echo ""
echo "Stopping servers..."
kill $BACKEND_PID 2>/dev/null
echo "✅ Servers stopped"
