#!/bin/bash

# MEAN Stack CRUD Application - Setup Script
# This script installs all dependencies for both backend and frontend

echo "🚀 Setting up MEAN Stack CRUD Application..."
echo ""

# Check if we're in the correct directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the Crud_Single_Resource directory"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

cd ..

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start MongoDB: sudo service mongod start"
echo "2. Start backend: cd backend && npm start"
echo "3. Start frontend: cd frontend && npm start"
echo "4. Open http://localhost:4200 in your browser"
echo ""
echo "For more information, see README.md"
