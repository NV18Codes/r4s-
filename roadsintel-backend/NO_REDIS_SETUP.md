# Setup Without Redis (Quick Start)

Since Redis setup can be complex on Windows, here's a simplified setup that works immediately:

## What You Need

✅ Already Done:
- Database created
- Tables created
- Dependencies installed

⚠️ Not Needed (for now):
- Redis (we'll use a simpler queue)

---

## Steps to Run

### 1. Make Sure You're in the Backend Directory

```powershell
cd roadsintel-backend
```

### 2. Start the Backend

```powershell
npm run start:dev
```

If it shows errors about Redis, the backend is trying to use Redis. Let me create a version that works without Redis.

---

## Current Issue

The backend is configured to use BullMQ (Redis) for the job queue. This is better for production but requires Redis.

**Tell me:**
- Do you want to install Redis via WSL2? (Takes ~10 minutes, best for production)
- Or do you want me to create a simpler version without Redis? (Immediate testing)

