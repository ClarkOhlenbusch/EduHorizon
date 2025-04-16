@echo off
echo Starting EDU Horizon for Windows...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed or not in PATH
    echo Please reinstall Node.js from https://nodejs.org/
    exit /b 1
)

REM Check if cross-env is installed
echo Checking for cross-env...
npm list cross-env --depth=0 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing cross-env package...
    npm install cross-env --save-dev
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install cross-env. Please try running:
        echo npm install cross-env --save-dev
        exit /b 1
    )
)

REM Check if npx is installed
where npx >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npx is not installed or not in PATH
    echo Please reinstall Node.js from https://nodejs.org/
    exit /b 1
)

echo All prerequisites are installed.
echo.
echo Starting EDU Horizon...
echo The application will be available at http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

REM Set environment variables and start the server
npx cross-env NODE_ENV=development tsx server/index.ts

echo.
echo Server stopped.