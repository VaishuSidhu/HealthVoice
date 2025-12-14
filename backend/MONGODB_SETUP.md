# MongoDB Atlas Setup Instructions

## Your Connection String

Your MongoDB Atlas connection string has been configured in `backend/.env`:

```
mongodb+srv://svvaishnavy_db_user:<db_password>@cluster0.zltlv1t.mongodb.net/healthvoice?retryWrites=true&w=majority&appName=Cluster0
```

## ⚠️ IMPORTANT: Replace Password

**You MUST replace `<db_password>` with your actual MongoDB Atlas password!**

### Steps:

1. **Open** `backend/.env` file
2. **Find** the line with `MONGODB_URI=`
3. **Replace** `<db_password>` with your actual password
4. **Save** the file

### Example:
If your password is `MySecurePass123`, the line should look like:
```
MONGODB_URI=mongodb+srv://svvaishnavy_db_user:MySecurePass123@cluster0.zltlv1t.mongodb.net/healthvoice?retryWrites=true&w=majority&appName=Cluster0
```

## MongoDB Atlas Network Access

Make sure your IP address is allowed in MongoDB Atlas:

1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Either:
   - Add your current IP address
   - Or click **Allow Access from Anywhere** (for development only - not recommended for production)

## Database Name

The connection string includes the database name `healthvoice`. If this database doesn't exist, MongoDB will create it automatically when you first connect.

## Test Connection

After updating the password, test the connection:

```powershell
cd backend
python app.py
```

You should see:
```
✓ Successfully connected to MongoDB (database: healthvoice)
✓ Database indexes created
 * Running on http://0.0.0.0:5000
```

## Troubleshooting

**Connection Error:**
- Verify password is correct (no `<db_password>` placeholder)
- Check Network Access in MongoDB Atlas
- Ensure cluster is running (not paused)

**Authentication Failed:**
- Double-check username: `svvaishnavy_db_user`
- Verify password is correct
- Check user has read/write permissions

**Database Not Found:**
- This is normal - MongoDB will create the database automatically
- The database name is `healthvoice`

