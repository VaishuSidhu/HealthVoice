# HealthVoice Complete Setup Guide

This guide will help you set up and run both the frontend and backend of the HealthVoice application.

## Prerequisites

### Required Software

1. **Node.js & npm** (for frontend)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Python 3.8+** (for backend)
   - Download from: https://www.python.org/downloads/
   - Or install from Microsoft Store: Search for "Python"
   - Verify installation: `python --version` or `python3 --version`

3. **MongoDB** (for database)
   - **Option A: MongoDB Atlas (Cloud - Recommended)**
     - Sign up at: https://www.mongodb.com/cloud/atlas
     - Create a free cluster
     - Get your connection string
   
   - **Option B: Local MongoDB**
     - Download from: https://www.mongodb.com/try/download/community
     - Install and start MongoDB service

## Quick Start (Windows)

### Option 1: Automated Setup (Recommended)

1. Open PowerShell in the project root directory
2. Run the startup script:
   ```powershell
   .\start-project.ps1
   ```

This will:
- Set up the backend (if needed)
- Start the backend server in a new window
- Start the frontend server

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to backend directory:
   ```powershell
   cd backend
   ```

2. Run setup script:
   ```powershell
   .\setup.ps1
   ```

3. Update `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthvoice
   ```

4. Start backend server:
   ```powershell
   .\start.ps1
   ```
   Or manually:
   ```powershell
   .\venv\Scripts\Activate.ps1
   python app.py
   ```

#### Frontend Setup

1. Navigate to frontend directory:
   ```powershell
   cd frontend
   ```

2. Install dependencies (first time only):
   ```powershell
   npm install
   ```

3. Start development server:
   ```powershell
   npm run dev
   ```

## Access the Application

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Testing the Backend

Once the backend is running, test it with:

```powershell
# Health check
curl http://localhost:5000/health

# Create a health log
curl -X POST http://localhost:5000/api/health-logs `
  -H "Content-Type: application/json" `
  -d '{\"prompt\": \"I have a headache and feel tired today. Took ibuprofen this morning.\"}'
```

## Project Structure

```
healthvoice/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── lib/
│   │       └── api.ts  # API service for backend
│   └── package.json
├── backend/           # Flask + MongoDB backend
│   ├── app.py         # Main Flask application
│   ├── controllers/   # Request handlers
│   ├── services/      # Business logic
│   ├── requirements.txt
│   └── .env           # Environment variables
└── start-project.ps1  # Startup script
```

## Troubleshooting

### Backend Issues

**Python not found:**
- Install Python from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation

**MongoDB connection error:**
- Verify your MongoDB connection string in `.env`
- For MongoDB Atlas: Check network access settings
- For local MongoDB: Ensure MongoDB service is running

**Port 5000 already in use:**
- Change `PORT=5001` in `.env` file
- Or stop the process using port 5000

### Frontend Issues

**npm install fails:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Port 8080 already in use:**
- Change port in `frontend/vite.config.ts`

**API connection errors:**
- Verify backend is running on http://localhost:5000
- Check browser console for CORS errors
- Verify `VITE_API_URL` in frontend `.env` (if using custom URL)

## Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/healthvoice
FLASK_ENV=development
PORT=5000
```

### Frontend (optional .env)

```env
VITE_API_URL=http://localhost:5000
```

## Next Steps

1. Create health logs using the voice input feature
2. View dashboard overview and insights
3. Generate doctor-ready summaries
4. Analyze health trends over time

## Support

For issues or questions, check:
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`

