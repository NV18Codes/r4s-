# Quick Start with WSL2 (Windows Subsystem for Linux)

This is the easiest way to get Redis running on Windows!

## 1. Install WSL2

Open PowerShell as Administrator and run:
```powershell
wsl --install
```

Follow the prompts and **restart your computer** when asked.

## 2. After Restart

1. WSL will open automatically
2. Create a username (all lowercase, no spaces)
3. Create a password

## 3. Install Redis in WSL

```bash
sudo apt update
sudo apt install redis-server -y
```

## 4. Start Redis

```bash
sudo service redis-server start
```

## 5. Verify Redis is Running

```bash
redis-cli ping
```

Should return: `PONG`

## 6. Keep Redis Running

Keep the WSL window open! Redis will keep running as long as WSL is active.

## 7. Back to Windows

Exit WSL:
```bash
exit
```

Now Redis is running on `localhost:6379` from Windows! ✅

## 8. Start Backend

In PowerShell (not WSL):
```powershell
cd roadsintel-backend
npm run start:dev
```

Done! 🎉

---

**Tip:** To make Redis start automatically, add it to your WSL startup:
```bash
echo "sudo service redis-server start" >> ~/.bashrc
```

