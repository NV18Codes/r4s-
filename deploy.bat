@echo off
echo 🚀 Starting deployment preparation...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Make sure you're in the project root directory.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Run linting
echo 🔍 Running linting...
npm run lint

REM Build the project
echo 🏗️  Building the project...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    echo.
    echo 📋 Next steps:
    echo 1. Push your code to Git repository
    echo 2. Connect your repository to Netlify
    echo 3. Set environment variables in Netlify dashboard
    echo 4. Deploy!
    echo.
    echo 🔗 See DEPLOYMENT.md for detailed instructions
) else (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

pause
