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
    echo # EDU Horizon Environment Variables > .env
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
echo The application is ready to use
echo.
echo The application will be available at http://localhost:5000
echo ================================