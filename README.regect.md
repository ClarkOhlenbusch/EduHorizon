# Canvas-Inspired Learning Management System

A modern, responsive learning management system inspired by Canvas LMS. This platform provides a comprehensive set of features for both instructors and students to manage courses, assignments, quizzes, and communication.

![LMS Preview](attached_assets/image_1744755960366.png)

## Features

- **Responsive Dashboard**: View all your courses, upcoming tasks, and important announcements
- **Course Management**: Easily navigate between courses and their content
- **Assignment & Quiz System**: Create, submit, and grade assignments and quizzes
- **Module Organization**: Organize course content into logical modules
- **AI-Powered Assistant**: Get help with course content using the built-in Gemini-powered assistant
- **Announcements**: Stay updated with course announcements
- **Grade Tracking**: View and manage grades for all assessments

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **State Management**: React Query
- **Routing**: Wouter
- **AI Integration**: Google Gemini API
- **Form Handling**: React Hook Form
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

### Online Demo

<<<<<<< HEAD
Visit the application on Replit: [LMS Demo](https://lms-demo.repl.co)
=======
<<<<<<< HEAD
Visit the application on Replit: [LMS Demo](https://lms-demo.repl.co)
=======
<<<<<<< HEAD
Visit the application on Replit: [LMS Demo](https://lms-demo.repl.co)
=======
Visit the application on Replit: [EDU Horizon Demo]([https://eduhorizon.yourusername.repl.co)](https://edu-horizon-clarkohlenbusch.replit.app/)
>>>>>>> 92c0b07b51484a32c1f0b7f34ec182ff67de4e2a
>>>>>>> eb05518b40eb8c50cd3763bca510434103862e41
>>>>>>> 0a147552458c492bbd295be1e600350c2a1ca2e7

### Installation for Windows

Follow these steps to set up the Learning Management System on a Windows machine:

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/edu-horizon.git
   cd edu-horizon
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Install cross-env (Required for Windows)**
   ```
   npm install cross-env --save-dev
   ```

4. **Modify package.json for Windows compatibility**
   
   Edit the `scripts` section in `package.json` to use cross-env:
   ```json
   "scripts": {
     "dev": "cross-env NODE_ENV=development tsx server/index.ts",
     "dev:windows": "cross-env NODE_ENV=development tsx server/index.ts",
     "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
     "start": "cross-env NODE_ENV=production node dist/index.js",
     "check": "tsc",
     "db:push": "drizzle-kit push"
   }
   ```

5. **Create environment variables file**
   
   Create a `.env` file in the root directory:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Note: If you don't have a Gemini API key, the application will still work, but the AI assistant will use fallback responses.

6. **Start the development server**
   ```
   npm run dev
   ```

   If you still encounter issues, try:
   ```
   npx cross-env NODE_ENV=development tsx server/index.ts
   ```

7. **Access the application**
   
   Open your browser and go to [http://localhost:5000](http://localhost:5000)

### Troubleshooting Windows-Specific Issues

1. **Environment Variable Issues**
   - If you see errors related to `NODE_ENV`, ensure you've installed and configured cross-env correctly
   - Verify the scripts in package.json are using cross-env

2. **Port Conflicts**
   - If port 5000 is in use, you can change it in `server/index.ts`

3. **Node Version Issues**
   - Use [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases) to install and use Node.js 18:
     ```
     nvm install 18
     nvm use 18
     ```

4. **Module Not Found Errors**
   - Try reinstalling node modules:
     ```
     rm -rf node_modules
     npm install
     ```

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/layouts` - Page layout components
  - `/src/lib` - Utility functions and types
  - `/src/pages` - Page components
  - `/src/hooks` - Custom React hooks
- `/server` - Express.js backend
- `/shared` - Shared code (types, schemas)

## Environment Variables

- `VITE_GEMINI_API_KEY` - Google Gemini API key for AI assistant functionality

## Building for Production

To create a production build:

```
npm run build
npm run start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- Inspired by Canvas LMS by Instructure
