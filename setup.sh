#!/bin/bash

# Portfolio Backend Setup Script
# This script helps set up the complete backend environment

echo "
╔════════════════════════════════════════════╗
║   Portfolio Backend Setup Script           ║
║   Cybersecurity & Ethical Hacker           ║
╚════════════════════════════════════════════╝
"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit the .env file and configure:"
    echo "   - MongoDB connection string"
    echo "   - Email service credentials"
    echo "   - JWT secret"
    echo ""
    echo "   nano .env  (or use your preferred editor)"
    echo ""
else
    echo "✓ .env file already exists"
fi

# Check MongoDB
echo ""
echo "🗄️  Checking MongoDB..."

# Try to connect to MongoDB
node -e "
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cybersecurity-portfolio';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✓ MongoDB connection successful');
    mongoose.disconnect();
  })
  .catch(err => {
    console.log('⚠️  MongoDB not connected. Make sure MongoDB is running:');
    console.log('   For local MongoDB: brew services start mongodb-community');
    console.log('   For MongoDB Atlas: check your connection string in .env');
  });
" 2>/dev/null || echo "⚠️  MongoDB check requires .env configuration"

# Create uploads directory
if [ ! -d "uploads" ]; then
    mkdir uploads
    echo "✓ Created uploads directory"
fi

# Initialize database
echo ""
echo "📋 Initializing database..."
node init.js

echo ""
echo "✅ Backend setup completed!"
echo ""
echo "Next steps:"
echo "1️⃣  Configure your .env file with actual credentials"
echo "2️⃣  Ensure MongoDB is running"
echo "3️⃣  Start the server with: npm run dev"
echo "4️⃣  Test API with: node test-api.js"
echo ""
echo "Server will run on: http://localhost:5000"
echo ""
