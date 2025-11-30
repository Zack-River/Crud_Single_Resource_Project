# MongoDB Setup Guide

Since MongoDB is not installed on your system, you have two options:

## Option 1: Use MongoDB Atlas (Cloud Database) - Recommended ⭐

**Fastest and easiest option - no local installation needed!**

### Steps:

1. **Sign up for MongoDB Atlas** (free):
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a free cluster**:
   - Choose the free M0 tier
   - Select a cloud provider and region close to you
   - Click "Create Cluster"

3. **Create a database user**:
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username: `meanuser`
   - Set a strong password (save this!)
   - User Privileges: "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Allow network access**:
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get your connection string**:
   - Go to "Database" (Clusters)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://meanuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

6. **Update your backend/.env file**:
   ```bash
   cd backend
   nano .env
   ```
   
   Replace the MONGODB_URI line with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://meanuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mean-crud-db?retryWrites=true&w=majority
   ```
   
   Save and exit (Ctrl+X, Y, Enter)

7. **Done! Skip to running the application**

---

## Option 2: Install MongoDB Locally

### Quick Installation:

Run this command:
```bash
cd ~/projects/Crud_Single_Resource
chmod +x install-mongodb.sh
sudo ./install-mongodb.sh
```

After installation completes:
```bash
# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot (optional)
sudo systemctl enable mongod

# Check MongoDB status
sudo systemctl status mongod
```

### Manual Installation (if script fails):

```bash
# 1. Import MongoDB GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# 2. Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 3. Update package database
sudo apt-get update

# 4. Install MongoDB
sudo apt-get install -y mongodb-org

# 5. Start MongoDB
sudo systemctl start mongod
```

---

## After MongoDB is Ready

Once you have MongoDB running (either Atlas or local), proceed with:

1. **Install project dependencies:**
   ```bash
   ./setup.sh
   ```

2. **Start the backend** (in one terminal):
   ```bash
   cd backend
   npm start
   ```

3. **Start the frontend** (in another terminal):
   ```bash
   cd frontend
   npm start
   ```

4. **Open your browser** to `http://localhost:4200`

---

## Troubleshooting

### MongoDB won't start locally?
- Check if port 27017 is available: `sudo lsof -i :27017`
- Check MongoDB logs: `sudo tail -f /var/log/mongodb/mongod.log`
- Try creating data directory: `sudo mkdir -p /data/db && sudo chown -R $USER:$USER /data/db`

### Atlas connection issues?
- Make sure you replaced `<password>` with your actual password
- Ensure your IP is whitelisted (or use 0.0.0.0/0 for development)
- Check that the database user has proper permissions

## Recommendation

**For this demo project, I recommend using MongoDB Atlas (Option 1)** because:
- ✅ No installation required
- ✅ Works immediately
- ✅ Free forever for small projects
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ No maintenance needed
