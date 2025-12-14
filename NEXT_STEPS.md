# Next Steps to Run HealthVoice

## ✅ What's Done

1. ✅ Backend code complete (Flask + MongoDB)
2. ✅ Frontend code complete (React + TypeScript)
3. ✅ Frontend dependencies installed
4. ✅ MongoDB Atlas connection string configured
5. ✅ API integration complete

## 🔧 What You Need to Do

### Step 1: Update MongoDB Password ⚠️ CRITICAL

**Open `backend/.env` file and replace `<db_password>` with your actual MongoDB Atlas password.**

Current line:
```
MONGODB_URI=mongodb+srv://svvaishnavy_db_user:<db_password>@cluster0.zltlv1t.mongodb.net/healthvoice?retryWrites=true&w=majority&appName=Cluster0
```

Should become (example):
```
MONGODB_URI=mongodb+srv://svvaishnavy_db_user:YourActualPassword123@cluster0.zltlv1t.mongodb.net/healthvoice?retryWrites=true&w=majority&appName=Cluster0
```

### Step 2: Check MongoDB Atlas Network Access

1. Go to https://cloud.mongodb.com/
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (for development) OR add your current IP
5. Click **Confirm**

### Step 3: Install Python (if not installed)

**Check if Python is installed:**
```powershell
python --version
```

**If not installed:**
1. Download from: https://www.python.org/downloads/
2. **IMPORTANT**: Check "Add Python to PATH" during installation
3. Restart PowerShell after installation

### Step 4: Set Up Backend

**Open PowerShell in the project root and run:**
```powershell
cd backend
.\setup.ps1
```

This will:
- Create virtual environment
- Install Python dependencies
- Verify setup

### Step 5: Start Backend Server

**In the backend directory:**
```powershell
.\start.ps1
```

**OR manually:**
```powershell
.\venv\Scripts\Activate.ps1
python app.py
```

**You should see:**
```
✓ Successfully connected to MongoDB (database: healthvoice)
✓ Database indexes created
 * Running on http://0.0.0.0:5000
```

### Step 6: Start Frontend Server

**Open a NEW PowerShell window:**
```powershell
cd frontend
npm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
```

## 🎯 Quick Test

1. **Backend Health Check:**
   - Open browser: http://localhost:5000/health
   - Should show: `{"status":"healthy","timestamp":"..."}`

2. **Frontend:**
   - Open browser: http://localhost:8080
   - Should see HealthVoice dashboard

3. **Test Voice Logging:**
   - Click microphone button
   - Enter: "I have a headache and feel tired today"
   - Check dashboard for updated data

## 📋 Checklist

- [ ] Updated `<db_password>` in `backend/.env`
- [ ] MongoDB Atlas Network Access configured
- [ ] Python installed and verified
- [ ] Backend dependencies installed (`.\setup.ps1`)
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 8080)
- [ ] Tested health check endpoint
- [ ] Tested voice logging feature

## 🆘 Troubleshooting

**Backend won't start:**
- Check Python: `python --version`
- Check MongoDB password in `.env`
- Check MongoDB Atlas Network Access
- Check port 5000 is not in use

**MongoDB connection error:**
- Verify password is correct (no `<db_password>` placeholder)
- Check Network Access in MongoDB Atlas
- Ensure cluster is not paused

**Frontend can't connect to backend:**
- Verify backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled (it should be)

## 📚 Documentation

- **MongoDB Setup**: `backend/MONGODB_SETUP.md`
- **Full Setup Guide**: `SETUP.md`
- **Quick Start**: `QUICK_START.md`

