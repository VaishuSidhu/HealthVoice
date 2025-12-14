# HealthVoice Quick Start Guide

## 🚀 Quick Start (2 Steps)

### Step 1: Start Backend

Open a **new PowerShell window** and run:

```powershell
cd backend
.\start.ps1
```

**If Python is not installed:**
1. Install Python from https://www.python.org/downloads/
2. Make sure to check "Add Python to PATH" during installation
3. Run `.\start.ps1` again

**If MongoDB connection fails:**
- Update `backend\.env` with your MongoDB connection string
- For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/healthvoice`
- For local MongoDB: `mongodb://localhost:27017/healthvoice`

### Step 2: Start Frontend

Open **another PowerShell window** and run:

```powershell
cd frontend
npm run dev
```

## ✅ Verify Everything Works

1. **Backend Health Check**: Open http://localhost:5000/health in your browser
   - Should show: `{"status":"healthy","timestamp":"..."}`

2. **Frontend**: Open http://localhost:8080 in your browser
   - Should see the HealthVoice dashboard

3. **Test Voice Logging**: 
   - Click the microphone button
   - Enter a health update like: "I have a headache and feel tired today"
   - Check the dashboard for updated data

## 📝 What's Included

### Backend (Flask + MongoDB)
- ✅ REST API endpoints for health logs
- ✅ Text analysis (symptoms, mood, medications, lifestyle)
- ✅ Dashboard overview
- ✅ Health insights
- ✅ Doctor-ready summaries
- ✅ Health trends analysis

### Frontend (React + TypeScript)
- ✅ Voice logging interface
- ✅ Dashboard with real-time data
- ✅ Health insights panel
- ✅ Trends charts
- ✅ Doctor summary card
- ✅ All components connected to backend API

## 🔧 Troubleshooting

**Backend won't start:**
- Check Python is installed: `python --version`
- Check MongoDB connection string in `backend\.env`
- Check port 5000 is not in use

**Frontend won't start:**
- Check Node.js is installed: `node --version`
- Run `npm install` in frontend directory
- Check port 8080 is not in use

**API errors:**
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

## 📚 Full Documentation

See `SETUP.md` for detailed setup instructions.

