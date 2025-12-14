# MongoDB for VSCode Setup Guide

## Connection String

Use this connection string to connect MongoDB for VSCode extension:

```
mongodb+srv://svvaishnavy_db_user:UdKPD4ZAdFAQehi8@cluster0.zltlv1t.mongodb.net/
```

## Steps to Connect

### 1. Install MongoDB for VSCode Extension

1. Open VSCode
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "MongoDB for VS Code"
4. Install the extension by MongoDB

### 2. Connect to MongoDB Atlas

1. **Open MongoDB View**:
   - Click the MongoDB icon in the left sidebar
   - Or press `Ctrl+Shift+P` and type "MongoDB: Connect"

2. **Add Connection**:
   - Click "Add Connection" or the "+" button
   - Select "Connect with connection string"

3. **Enter Connection String**:
   ```
   mongodb+srv://svvaishnavy_db_user:UdKPD4ZAdFAQehi8@cluster0.zltlv1t.mongodb.net/
   ```

4. **Connection Name** (optional):
   - Name it: "HealthVoice Atlas" or "Cluster0"

5. **Click Connect**

### 3. Browse Your Database

Once connected, you'll see:
- **Databases**: `healthvoice`
- **Collections**: 
  - `health_logs` - All health logs
  - `users` - User data (if you add user management)

### 4. View Health Logs

1. Expand `healthvoice` database
2. Expand `health_logs` collection
3. Click on any document to view its contents
4. You can see:
   - User ID
   - Prompt text
   - Analysis (symptoms, mood, medications, lifestyle)
   - Summary
   - Timestamp

## Connection String Details

- **Protocol**: `mongodb+srv://` (MongoDB Atlas)
- **Username**: `svvaishnavy_db_user`
- **Password**: `UdKPD4ZAdFAQehi8`
- **Cluster**: `cluster0.zltlv1t.mongodb.net`
- **Database**: `healthvoice` (will be selected automatically)

## Troubleshooting

**Connection Failed:**
- Verify network access in MongoDB Atlas
- Check if cluster is running (not paused)
- Verify password is correct

**Can't See Database:**
- Make sure you've created at least one health log
- Database is created automatically on first insert

**Extension Not Working:**
- Restart VSCode
- Check extension is enabled
- Update extension to latest version

## Quick Access

After connecting, you can:
- ✅ View all health logs
- ✅ See user-specific data
- ✅ Check document structure
- ✅ Verify data is being stored
- ✅ Export data if needed

## Security Note

⚠️ **Important**: The connection string contains your password. 
- Don't share this file publicly
- Consider using environment variables for production
- The `.env` file is already in `.gitignore`

