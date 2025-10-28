# Step-by-Step Guide: Getting Crack Detection Working 100%

You now have database access! Follow these steps carefully.

## ⚡ Quick Overview

1. Create `.env` file with database credentials
2. Install dependencies
3. Generate Prisma client
4. Create database tables
5. Start Redis (for job queue)
6. Start backend server
7. Test from frontend

---

## 📝 Step 1: Create `.env` File

Create a file named `.env` in the `roadsintel-backend` folder with the following content:

```env
# Database Configuration (MySQL)
DATABASE_URL="mysql://dev45:YOUR_PASSWORD@89.116.25.62:3306/roadsintel?schema=public"

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Redis Configuration (for job queue)
REDIS_HOST=localhost
REDIS_PORT=6379

# File Upload Configuration
UPLOAD_PATH=./uploads
```

**⚠️ Important:** Replace `YOUR_PASSWORD` with your actual MySQL password!

---

## 📦 Step 2: Install Dependencies

The backend needs all its dependencies. Run these commands in the `roadsintel-backend` folder:

```bash
npm install @nestjs/common @nestjs/core @nestjs/platform-fastify @fastify/multipart
npm install @nestjs/config @nestjs/bullmq bullmq
npm install @prisma/client
npm install --save-dev prisma typescript ts-node @nestjs/cli
npm install ioredis Fortunes nanoid
```

Or install everything at once with our updated package.json (I'll update it for you).

---

## 🔧 Step 3: Generate Prisma Client

Generate the Prisma client for MySQL:

```bash
npx prisma generate
```

This creates the database client based on your schema.

---

## 🗄️ Step 4: Create Database Tables

Before running migrations, **make sure the database `roadsintel` exists**:

### Option A: If database already exists
Run migrations:

```bash
npx prisma db push
```

### Option B: If database doesn't exist yet
Create it first:

```bash
mysql -h 89.116.25.62 -u dev45 -p
```

Then in MySQL:
```sql
CREATE DATABASE roadsintel;
EXIT;
```

Then run:
```bash
npx prisma db push
```

---

## ⚙️ Step 5: Set Up Redis (for Job Queue)

The crack detection uses a job queue (BullMQ) which requires Redis.

### Option A: Install Redis on Windows
1. Download Redis for Windows: https://github.com/microsoftarchive/redis/releases
2. Or use WSL2: `wsl --install` then install Redis in WSL

### Option B: Use Docker (Recommended)
```bash
docker run -d -p 6379:6379 redis:7-alpine
```

### Option C: Use Cloud Redis
- Redis Cloud (free tier)
- Update REDIS_HOST and REDIS_PORT in `.env`

---

## 🚀 Step 6: Start Backend Server

In the `roadsintel-backend` folder:

```bash
npm run start:dev
```

You should see:
```
🚀 Server running on http://localhost:3001
```

---

## 🧪 Step 7: Test Crack Detection

1. Make sure your frontend is running on port 3000
2. Go to http://localhost:3000/dashboard/inspections
3. Click "Upload Road Image"
4. Select an image file
5. Click "Upload & Analyze"
6. Wait for detection results!

---

## ✅ Verification Checklist

- [ ] `.env` file created with correct database credentials
- [ ] Dependencies installed (`node_modules` exists)
- [ ] Prisma client generated
- [ ] Database tables created (check with `npx prisma studio`)
- [ ] Redis running on port 6379
- [ ] Backend server running on port 3001
- [ ] Can upload image from frontend
- [ ] Detection results appear

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check your `.env` file credentials
- Verify IP is whitelisted in MySQL
- Test connection: `mysql -h 89.116.25.62 -u dev45 -p`

### "Redis connection failed"
- Make sure Redis is running
- Check REDIS_HOST and REDIS_PORT in `.env`
- Try: `redis-cli ping` (should return "PONG")

### "Prisma Client not found"
- Run: `npx prisma generate`

### "Failed to read file"
- Make sure `uploads` folder exists: `mkdir uploads`

### Backend won't start
- Check for port conflicts (3001 already in use?)
- Check console for error messages

---

## 📊 How It Works

1. **Upload**: User uploads image via frontend → Backend receives it
2. **Save**: Image saved to `uploads/` folder and database record created
3. **Queue**: Detection job added to Redis queue (BullMQ)
4. **Process**: Background worker detects cracks (currently using stub, returns random results)
5. **Store**: Crack detections saved to database
6. **Create**: Work order auto-created if cracks found
7. **Return**: Frontend polls for status and displays results

---

## 🎯 Current Status

✅ **Working:**
- Image upload
- Database storage
- Job queue system
- Work order creation
- Frontend integration

⏳ **Stub Implementation:**
- Crack detection (currently returns random results)
- Real YOLOv8 model integration needed for production

---

## 🚀 Next Steps (Future Enhancement)

To get **real** crack detection (not random results):

1. Train or download YOLOv8 crack detection model
2. Integrate with `src/ml/crack-detector.service.ts`
3. Replace stub with actual model inference
4. Update detection logic for better accuracy

---

## 💡 Need Help?

If you encounter any issues at any step, let me know and I'll help you troubleshoot!

<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
read_file
