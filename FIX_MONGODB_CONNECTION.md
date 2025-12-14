# Fix MongoDB Atlas Connection

## ⚠️ Backend Connection Issue

The backend server is trying to connect to MongoDB Atlas but may be blocked by network access settings.

## 🔧 Quick Fix (2 Minutes)

### Step 1: Configure MongoDB Atlas Network Access

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Login** with your account
3. **Select your cluster**: `Cluster0`
4. **Click "Network Access"** (left sidebar, under Security)
5. **Click "Add IP Address"** button
6. **Click "Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0` to allowed IPs
7. **Click "Confirm"**
8. **Wait 1-2 minutes** for changes to take effect

### Step 2: Restart Backend Server

After network access is configured:

```powershell
# Stop current backend (Ctrl+C if running)
# Then restart:

cd backend
.\venv\Scripts\Activate.ps1
python app.py
```

You should see:
```
✓ Successfully connected to MongoDB (database: healthvoice)
✓ Database indexes created
 * Running on http://0.0.0.0:5000
```

## ✅ Verify Connection

Once backend starts successfully, test it:

```powershell
curl http://localhost:5000/health
```

Or open in browser: http://localhost:5000/health

Should show:
```json
{"status":"healthy","timestamp":"2024-..."}
```

## 🎯 Current Status

- ✅ **Frontend**: Running on http://localhost:8080
- ⏳ **Backend**: Waiting for MongoDB network access configuration
- ✅ **Dependencies**: All installed
- ✅ **Configuration**: MongoDB connection string set

## 📝 Alternative: Use Local MongoDB

If you prefer local MongoDB instead of Atlas:

1. Install MongoDB Community: https://www.mongodb.com/try/download/community
2. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/healthvoice
   ```
3. Start MongoDB service
4. Restart backend server

---

**After configuring network access, your application will be fully functional!**

