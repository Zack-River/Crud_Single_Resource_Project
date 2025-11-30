#!/bin/bash

# Script to create a zip archive of the MEAN Stack project

echo "📦 Creating zip archive of MEAN Stack CRUD Application..."
echo ""

# Check if zip is installed
if ! command -v zip &> /dev/null; then
    echo "Installing zip utility..."
    sudo apt-get update
    sudo apt-get install -y zip
fi

# Create the zip file, excluding node_modules and build artifacts
echo "Compressing files..."
zip -r ../Crud_Single_Resource.zip . \
    -x "node_modules/*" \
    -x "*/node_modules/*" \
    -x ".angular/*" \
    -x "*/.angular/*" \
    -x "dist/*" \
    -x "*/dist/*" \
    -x "*.log" \
    -x ".git/*"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Archive created successfully!"
    echo "📍 Location: ~/projects/Crud_Single_Resource.zip"
    echo ""
    
    # Show file size
    SIZE=$(du -h ../Crud_Single_Resource.zip | cut -f1)
    echo "📊 Size: $SIZE"
    echo ""
    echo "You can now share or backup this file!"
else
    echo "❌ Error creating archive"
    exit 1
fi
