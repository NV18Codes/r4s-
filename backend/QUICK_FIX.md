# Quick Fix for Login Error

## The Problem
You're getting 401 "Invalid email or password" because Supabase database isn't set up yet.

## Quick Solution (5 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Click "New Project"
4. Name: `roadsintel-production`
5. Choose a password
6. Click "Create new project"

### Step 2: Get Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xyz.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### Step 3: Update .env File
In your `backend` folder, create/update `.env` file:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=roadsintel-production-secret-key-2024
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://roadsintel.netlify.app
```

### Step 4: Create Database Tables
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the **entire content** from `backend/supabase-schema.sql`
4. Paste it in SQL Editor
5. Click **Run**
6. Wait for "Success. No rows returned"

### Step 5: Restart Backend
```bash
# Stop the backend (Ctrl+C)
# Then restart:
npm run dev
```

### Step 6: Test Login Again
In Postman:
1. Use **User Login** request
2. Email: `admin@roadsintel.com`
3. Password: `password`
4. Click Send

**It should work now! ✅**

## Alternative: Quick Test Without Supabase

If you want to test immediately without Supabase established, I can create a temporary version that works with in-memory data. Just let me know!

