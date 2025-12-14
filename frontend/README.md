# HealthVoice

A voice-first HealthTech dashboard that transforms your daily health experiences into structured medical insights using natural voice input.

## Project Overview

HealthVoice is a modern health tracking application that allows users to log their health information through voice input. The application analyzes voice notes to extract symptoms, mood, medications, and lifestyle context, providing structured insights and doctor-ready summaries.

## Technologies

This project is built with:

- **Frontend**: Vite, TypeScript, React, shadcn-ui, Tailwind CSS
- **Backend**: Python Flask, MongoDB

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Python 3.8+ (for backend)
- MongoDB Atlas account or local MongoDB instance

### Frontend Setup

```sh
# Step 1: Navigate to the project directory
cd healthvoice

# Step 2: Install the necessary dependencies
npm i

# Step 3: Start the development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### Backend Setup

See the `backend/README.md` file for detailed backend setup instructions.

## Development

### Frontend Development

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

### Project Structure

```
healthvoice/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── public/             # Static assets
└── backend/            # Flask backend API
```

## Features

- 🎤 Voice-first health logging
- 📊 Health insights and trends
- 💊 Medication tracking
- 🧠 Mood and mental state tracking
- 📋 Doctor-ready summaries
- 🔒 Privacy-focused design

## License

Proprietary - All rights reserved
