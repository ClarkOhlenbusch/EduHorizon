# EDU Horizon - Canvas-inspired Course Management System

A modern course management system inspired by Canvas LMS, with an interactive UI and AI-powered assistant.

## Features

- Interactive dashboard with course cards, to-do list, and upcoming events
- Course pages with modules, assignments, quizzes, and grades
- File upload options for quiz creation and paper-based test grade entry
- Integration with external platforms like Gradescope and GitHub Classroom
- AI chat assistant powered by Google's Gemini API

## Installation

```bash
# Clone the repository
git clone <repository-url> edu-horizon
cd edu-horizon

# Install dependencies
npm install

# Optional: Install cross-env for cross-platform compatibility
npm install --save-dev cross-env
```

## Running the Application

### On Unix/Linux/Mac

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Run production build
npm run start
```

### On Windows

We've included batch files to help you run the application on Windows:

```bash
# Development mode
start-windows.bat

# Build for production
build-windows.bat

# Run production build
start-prod-windows.bat
```

Alternatively, you can use PowerShell with cross-env (if installed):

```powershell
# Development mode
npx cross-env NODE_ENV=development npx tsx server/index.ts

# Production mode (after building)
npx cross-env NODE_ENV=production node dist/index.js
```

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Technologies Used

- Frontend: React, TypeScript, TailwindCSS, shadcn/ui
- Backend: Express.js
- State Management: React Query
- Routing: wouter
- Forms: react-hook-form with zod validation
- AI: Google Gemini API

## Project Structure

- `client/` - Frontend React application
- `server/` - Express backend server
- `shared/` - Shared types and schemas