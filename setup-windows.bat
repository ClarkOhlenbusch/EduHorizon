@echo off
echo EDU Horizon - Windows Setup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed or not in PATH
    echo Please reinstall Node.js from https://nodejs.org/
    exit /b 1
)

echo npm version:
npm --version
echo.

REM Install dependencies
echo Installing project dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to install dependencies
    exit /b 1
)

REM Install cross-env specifically
echo Installing cross-env for Windows compatibility...
call npm install cross-env --save-dev
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to install cross-env
    exit /b 1
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    echo VITE_GEMINI_API_KEY= > .env
    echo .env file created
) else (
    echo .env file already exists
)

echo.
echo ================================
echo Setup completed successfully!
echo.
echo To start the application, run:
echo   start-windows.bat
echo.
echo If you have a Gemini API key, edit the .env file and add:
echo   VITE_GEMINI_API_KEY=your_api_key_here
echo.
echo The application will be available at http://localhost:5000
echo ================================