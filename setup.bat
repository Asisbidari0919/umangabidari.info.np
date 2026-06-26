@echo off
REM Portfolio Backend Setup Script for Windows
REM This script helps set up the complete backend environment

echo.
echo ╔════════════════════════════════════════════╗
echo ║   Portfolio Backend Setup Script (Windows) ║
echo ║   Cybersecurity ^& Ethical Hacker           ║
echo ╚════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm version: %NPM_VERSION%

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✓ Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo.
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ✓ .env file created
    echo.
    echo ⚠️  IMPORTANT: Edit the .env file and configure:
    echo    - MongoDB connection string
    echo    - Email service credentials
    echo    - JWT secret
    echo.
) else (
    echo ✓ .env file already exists
)

REM Create uploads directory
if not exist "uploads" (
    mkdir uploads
    echo ✓ Created uploads directory
)

REM Initialize database
echo.
echo 📋 Initializing database...
call node init.js

echo.
echo ✅ Backend setup completed!
echo.
echo Next steps:
echo 1️⃣  Configure your .env file with actual credentials
echo 2️⃣  Ensure MongoDB is running
echo 3️⃣  Start the server with: npm run dev
echo 4️⃣  Test API with: node test-api.js
echo.
echo Server will run on: http://localhost:5000
echo.
pause
