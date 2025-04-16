# EDU Horizon - Installation Guide

Thank you for downloading EDU Horizon! This guide will help you get the application up and running on your system.

## Installation Instructions

### Windows Users

1. **Prerequisites**
   - Make sure you have [Node.js](https://nodejs.org/) version 18 or newer installed
   - You can check your Node.js version by opening Command Prompt and typing: `node --version`

2. **Setup Process**
   - Double-click on the `setup-windows.bat` file in the project folder
   - This will install all required dependencies automatically
   - Wait until the setup completes successfully

3. **Starting the Application**
   - Double-click on the `start-windows.bat` file
   - The application will start and automatically open in your default browser
   - If it doesn't open automatically, navigate to [http://localhost:5000](http://localhost:5000)

4. **Optional: Gemini API Integration**
   - For AI assistant functionality, you need a Gemini API key from Google
   - Get your API key from [Google AI Studio](https://aistudio.google.com/)
   - Edit the `.env` file in the root directory and add: `VITE_GEMINI_API_KEY=your_api_key_here`
   - Restart the application for the changes to take effect

### macOS/Linux Users

1. **Prerequisites**
   - Make sure you have [Node.js](https://nodejs.org/) version 18 or newer installed
   - You can check your Node.js version by opening Terminal and typing: `node --version`

2. **Setup Process**
   - Open Terminal
   - Navigate to the project directory: `cd path/to/edu-horizon`
   - Install dependencies: `npm install`

3. **Starting the Application**
   - In Terminal, run: `npm run dev`
   - The application will be available at [http://localhost:5000](http://localhost:5000)

4. **Optional: Gemini API Integration**
   - For AI assistant functionality, you need a Gemini API key from Google
   - Get your API key from [Google AI Studio](https://aistudio.google.com/)
   - Create a `.env` file in the root directory and add: `VITE_GEMINI_API_KEY=your_api_key_here`
   - Restart the application for the changes to take effect

## Troubleshooting

### Common Issues on Windows

1. **"Node.js is not installed" error**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)
   - Make sure to select the option to add Node.js to your PATH during installation

2. **"Port 5000 is already in use" error**
   - Edit the `server/index.ts` file and change the port number (e.g., from 5000 to 3000)
   - Restart the application

3. **"Module not found" errors**
   - Try deleting the `node_modules` folder
   - Run `setup-windows.bat` again to reinstall all dependencies

### Common Issues on macOS/Linux

1. **Permission errors**
   - Run commands with sudo if needed: `sudo npm install`

2. **Node version issues**
   - Use nvm to install the correct Node.js version:
     ```
     nvm install 18
     nvm use 18
     ```

## Need Help?

If you encounter any issues not covered in this guide, please:

1. Check the `README.md` file for additional information
2. Visit our GitHub repository for the latest updates and documentation
3. Create an issue on GitHub if you're experiencing a bug

Thank you for using EDU Horizon!