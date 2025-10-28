# 🔧 API Setup Guide - Complete Backend Configuration

## Current Status
✅ Frontend is configured to use: `https://r4s.onrender.com`
❌ Backend needs to be set up on Render.com
❌ Environment variables need to be configured

---

## Step 1: Backend Deployment on Render.com

### 1.1 Create a New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your repository: `https://github.com/NV18Codes/r4s-.git`
4. Select branch: `main`

### 1.2 Configure Render Service
```
Name: r4s-backend
Region: Choose closest to your users
Branch: main
Root Directory: backend
Build Command: cd backend && npm install
Start Command: cd backend && node server.js
Instance Type: Free
```

### 1.3 Environment Variables on Render
Add these in Render's Environment Variables section:

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
JWT_SECRET=roadsintel-production-secret-key-2024
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://roadsintel.netlify.app
```

---

## Step 2: Supabase Setup (If Not Done)

### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your **Project URL** and **Anon Key**

### 2.2 Run Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `backend/supabase-schema-updated.sql`
3. Run the SQL script

### 2.3 Create Storage Bucket
The schema includes this, but verify:
- Bucket name: `road-images`
- Public: Yes

---

## Step 3: Update Frontend Environment

### 3.1 Netlify Environment Variables
1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add:
```
NEXT_PUBLIC_BACKEND_URL=https://r4s-backend.onrender.com
```
(Replace with your actual Render URL)

---

## Step 4: Test the API

### 4.1 Health Check
```bash
curl https://r4s-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "RoadsIntel Production Backend is running!",
  "timestamp": "2024-01-XX...",
  "supabase": "Connected"
}
```

### 4.2 Test Login (Using Postman)
```bash
POST https://r4s-backend.onrender.com/api/v1/User/signin
Content-Type: application/json

{
  "email": "admin@roadsintel.com",
  "password": "password"
}
```

Expected response:
```json
{
  "meta": {
    "status": "Success",
    "messages": [{ "text": "Login successful" }]
  },
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

---

## API Endpoints Reference

### Authentication
- `POST /api/v1/User/signin` - Login
- `POST /api/v1/User/signup` - Register

### Inspections
- `GET /api/v1/inspections` - Get all inspections
- `GET /api/v1/inspections/:id` - Get specific inspection
- `POST /api/v1/images/upload` - Upload image and detect cracks
- `GET /api/v1/inspections/:id/workorders` - Get work orders for inspection

### Work Orders
- `GET /api/v1/workorders` - Get all work orders

### Other Resources
- `GET /api/v1/spaces` - Get all spaces
- `GET /api/v1/assets` - Get all assets
- `GET /api/v1/organizations` - Get all organizations

---

## Troubleshooting

### Issue: CORS Error
**Solution**: Make sure `FRONTEND_URL` is set in Render environment variables

### Issue: Database Connection Error
**Solution**: Check Supabase credentials in Render environment variables

### Issue: Image Upload Fails
**Solution**: 
1. Verify `road-images` bucket exists in Supabase Storage
2. Check bucket is public
3. Verify uploads directory permissions

### Issue: "Cannot GET /"
**Solution**: Use correct endpoint paths with `/api/v1/` prefix

---

## Quick Start (Local Testing)

### 1. Backend Setup (Local)
```bash
cd backend
cp env.example .env
# Edit .env with your Supabase credentials
npm install
node server.js
```

### 2. Test Locally
```bash
# Frontend
npm run dev

# Backend should be running on http://localhost:3001
# Frontend should be on http://localhost:3000
```

---

## Current Backend URL
**Production**: `https://r4s.onrender.com`
**Local**: `http://localhost:3001`

---

## Next Steps
1. ✅ Deploy backend to Render
2. ✅ Set up environment variables on Render
3. ✅ Update Netlify environment variables
4. ✅ Test all endpoints
5. ✅ Deploy frontend changes

---

**Status**: Ready for deployment! 🚀
