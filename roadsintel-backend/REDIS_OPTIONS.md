# Redis Setup Options for Windows

The backend needs Redis for the job queue. Choose ONE option:

---

## ✅ Option 1: Use WSL2 (Recommended for Windows)

### Install WSL2 and Redis:
```powershell
# Install WSL2
wsl --install

# After restart, install Redis in WSL
wsl
sudo apt update
sudo apt install redis-server

# Start Redis
sudo service redis-server start

# Exit WSL
exit
```

Now Redis runs on `localhost:6379` from Windows! ✅

---

## ✅ Option 2: Install Redis for Windows

Download from: https://github.com/microsoftarchive/redis/releases

- Download the latest `.zip` file
- Extract to `C:\redis`
- Run: `redis-server.exe`

---

## ✅ Option 3: Use Memurai (Redis Alternative for Windows)

Download from: https://www.memurai.com/get-memurai
- It's a Windows-native Redis alternative
- Free for development

---

## ✅ Option 4: Quick Test Without Redis (Simplified)

I can modify the code to work without Redis temporarily for testing. Let me know if you want this!

---

## Current Status
- ❌ Redis: Not running
- ✅ Database: Tables created
- ❌ Backend: Waiting for Redis

**Which option do you want to use?**

