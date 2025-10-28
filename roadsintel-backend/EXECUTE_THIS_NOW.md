# ⚡ Execute These Steps NOW to Get Crack Detection Working

## Step-by-Step Instructions (Do in Order!)

### STEP 1: Create `.env` File (CRITICAL!)

**Action:** Create a new file named `.env` in the `roadsintel-backend` folder

**Content:**
```env
DATABASE_URL="mysql://dev45:YOUR_ACTUAL_PASSWORD@89.116.25.62:3306/roadsintel?schema=public"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
REDIS_HOST=localhost
REDIS_PORT=6379
UPLOAD_PATH=./uploads
```

⚠️ **Replace `YOUR_ACTUAL_PASSWORD` with your real MySQL password!**

---

### STEP 2: Install Dependencies

Open PowerShell/Terminal in `roadsintel-backend` folder and run:

```powershell
npm install
```

⏳ **Wait for it to complete** (2-3 minutes)

---

### STEP 3: Generate Prisma Client

```powershell
npx prisma generate
```

---

### STEP 4: Create Database Tables

```powershell
npx prisma db push
```

This will ask:
- `Proceed? (y)` → Type: **y** and press Enter

✅ Tables created!

---

### STEP 5: Start Redis

**Choose ONE option:**

#### Option A: Docker (Easiest)
```powershell
docker run -d -p 6379:6379 --name redis redis:7-alpine
```

#### Option B: Check if Redis already running
```powershell
redis-cli ping
```
(If it returns "PONG", Redis is already running!)

---

### STEP 6: Start Backend Server

```powershell
npm run start:dev
```

Look for:
```
🚀 Server running on http://localhost:3001
```

✅ **Backend is now running!**

---

### STEP 7: Test from Frontend

1. Make sure frontend is running on port 3000
2. Go to: http://localhost:3000/dashboard/inspections
3. Click: **"Upload Road Image"**
4. Select a road image file
5. Click: **"Upload & Analyze"**
6. Wait ~3 seconds
7. You should see: **"Detection complete! Found X cracks"** ✅

---

## 🎉 Success!

If you see detection results, **it's working!**

---

## 🆘 Troubleshooting

### "Cannot find module"
→ Run: `npm install` again

### "Database connection error"
→ Check `.env` file credentials are correct

### "Redis connection failed"
→ Start Redis first: `docker run -d -p 6379:6379 --name redis redis:7-alpine`

### "Port 3001 already in use"
→ Stop other process or change PORT in `.env`

### "Prisma Client not found"
→ Run: `npx prisma generate`

---

## 📊 What Happens

1. ✅ You upload image → Saved to database + `uploads/` folder
2. ✅ Job queued to Redis → Background processing starts
3. ✅ Crack detection runs → Returns results
4. ✅ Results saved to database → Work order created if cracks found
5. ✅ Frontend polls for status → Shows results to you

---

## 📝 Notes

- Currently uses **stub detection** (random results for testing)
- To get real AI detection, need to integrate YOLOv8 model
- All data saved to MySQL database
- Redis needed for job queue
- File uploads saved to `uploads/` folder

---

Ready? Start with **STEP 1** above! 🚀

