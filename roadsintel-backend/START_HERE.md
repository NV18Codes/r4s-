# 🚀 Quick Start - Crack Detection Setup

Follow these steps **in order** to get crack detection working!

## 1️⃣ Create `.env` File

Create a file named `.env` in this folder (`roadsintel-backend`) with:

```env
DATABASE_URL="mysql://dev45:YOUR_PASSWORD@89.116.25.62:3306/roadsintel?schema=public"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
REDIS_HOST=localhost
REDIS_PORT=6379
UPLOAD_PATH=./uploads
```

**Replace `YOUR_PASSWORD` with your actual MySQL password!**

---

## 2️⃣ Install Dependencies

Open PowerShell or Terminal in this folder and run:

```bash
npm install
```

This will install all required packages (may take 2-3 minutes).

---

## 3️⃣ Generate Prisma Client

```bash
npx prisma generate
```

---

## 4️⃣ Create Database Tables

```bash
npx prisma db push
```

This creates all the tables needed for crack detection.

---

## 5️⃣ Start Redis (Choose ONE option)

### Option A: Using Docker (Recommended)
```bash
docker run -d -p 6379:6379 --name redis redis:7-alpine
```

### Option B: Install Redis on Windows
Download: https://github.com/microsoftarchive/redis/releases

### Option C: Use Cloud Redis
- Sign up for Redis Cloud (free)
- Update REDIS_HOST in `.env`

---

## 6️⃣ Start Backend Server

```bash
npm run start:dev
```

You should see: `🚀 Server running on http://localhost:3001`

---

## 7️⃣ Test It!

1. Open frontend at http://localhost:3000
2. Go to Dashboard → Inspections
3. Click "Upload Road Image"
4. Select an image
5. Click "Upload & Analyze"

---

## ✅ Success Checklist

- [ ] `.env` file created
- [ ] Dependencies installed (npm install done)
- [ ] Prisma client generated
- [ ] Database tables created
- [ ] Redis running
- [ ] Backend running on port 3001
- [ ] Image upload works
- [ ] Detection results show

---

## 🆘 Issues?

Check `CRACK_DETECTION_SETUP.md` for detailed troubleshooting!

---

## 📋 Current Status

✅ All code is ready
⏳ Need to: Install dependencies → Run migrations → Start services → Test

