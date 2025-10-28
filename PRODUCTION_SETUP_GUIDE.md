# 🚀 RoadsIntel Production Backend - Complete Setup Guide

## 📋 **What You Have:**

### **Backend Files:**
- `backend/server.js` - Production backend with Supabase integration
- `backend/package.json` - Dependencies
- `backend/env.example` - Environment variables template
- `backend/supabase-schema.sql` - Database schema

### **Testing:**
- `RoadsIntel_Production_Postman_Collection.json` - Postman API collection

---

## 🗄️ **STEP 1: Setup Supabase Database (5 minutes)**

### **1.1 Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up/login with GitHub
4. Click **"New Project"**
5. **Project Name:** `roadsintel-production`
6. **Database Password:** Choose a strong password (save it!)
7. **Region:** Choose closest to you
8. Click **"Create new project"**

### **1.2 Get Supabase Credentials**
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### **1.3 Create Database Tables**
1. Go to **SQL Editor** in Supabase dashboard
2. Copy the entire content from `backend/supabase-schema.sql`
3. Paste it in the SQL Editor
4. Click **"Run"**
5. Wait for all tables to be created

### **1.4 Verify Tables Created**
1. Go to **Table Editor**
2. You should see these tables:
   - `users`
   - `organizations`
   - `spaces`
   - `assets`
   - `inspections`
   - `work_orders`
   - `asset_types`
   - `checklists`
   - `properties`

---

## 🧪 **STEP 2: Test with Postman (10 minutes)**

### **2.1 Install Dependencies**
```bash
cd backend
npm install
```

### **2.2 Create Environment File**
```bash
cp env.example .env
```

### **2.3 Update .env File**
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
JWT_SECRET=roadsintel-production-secret-key-2024
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://roadsintel.netlify.app
```

### **2.4 Start Backend**
```bash
npm run dev
```

### **2.5 Import Postman Collection**
1. Open **Postman**
2. Click **Import** button
3. Select `RoadsIntel_Production_Postman_Collection.json`
4. Click **Import**

### **2.6 Test Endpoints (Follow Order)**

#### **Test 1: Health Check**
1. Select **Health Check** request
2. Set `base_url` to `http://localhost:3001`
3. Click **Send**
4. **Expected:** `{"status":"OK","message":"RoadsIntel Production Backend is running!","supabase":"Connected"}`

#### **Test 2: User Login**
1. Select **User Login** request
2. Click **Send**
3. **Expected:** Response with user data and token
4. **Copy the token** from response
5. Go to collection variables and paste token in `auth_token`

#### **Test 3: Dashboard Stats**
1. Select **Dashboard Stats** request
2. Click **Send**
3. **Expected:** Statistics data from Supabase

#### **Test 4: Create Space**
1. Select **Create Space** request
2. Click **Send**
3. **Expected:** New space created in Supabase

#### **Test 5: Upload Image (Crack Detection)**
1. Select **Upload Image (Crack Detection)** request
2. Click **Body** tab
3. Click **Select Files** next to `image`
4. Choose a road image file
5. Click **Send**
6. **Expected:** Crack detection results with work order created in Supabase

#### **Test 6: Other Endpoints**
- Test **Get All Spaces** - should show your created space
- Test **Get All Assets**
- Test **Get All Inspections** - should show your uploaded image inspection
- Test **Get All Work Orders** - should show work order from crack detection

---

## 🚂 **STEP 3: Deploy to Railway (10 minutes)**

### **3.1 Push to GitHub**
```bash
git add backend/
git commit -m "Add production backend with Supabase"
git push origin main
```

### **3.2 Deploy on Railway**
1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Click **Settings** → **Root Directory**
6. Set to: `backend`
7. Click **Save**

### **3.3 Set Environment Variables**
1. In Railway project, click **Variables** tab
2. Add these variables:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
JWT_SECRET=roadsintel-production-secret-key-2024
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://roadsintel.netlify.app
```

### **3.4 Deploy**
1. Railway will automatically build and deploy
2. Wait for build to complete (green checkmark)
3. Copy the **Public URL** (e.g., `https://your-app.up.railway.app`)

### **3.5 Test Railway Deployment**
1. Update Postman `base_url` to your Railway URL
2. Test **Health Check** endpoint
3. Test **User Login** endpoint
4. Verify Supabase connection works

---

## 🌐 **STEP 4: Connect to Netlify (5 minutes)**

### **4.1 Update Netlify Environment Variables**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your **RoadsIntel** site
3. Go to **Site Settings** → **Environment Variables**
4. Add/Update:
   - **Key:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** Your Railway URL (e.g., `https://your-app.up.railway.app`)
5. Click **Save**

### **4.2 Redeploy Frontend**
1. In Netlify, go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

### **4.3 Test Complete Flow**
1. Go to `https://roadsintel.netlify.app`
2. **Login** with: `admin@roadsintel.com` / `password`
3. **Navigate** to Dashboard
4. **Upload image** in Inspections
5. **Verify** crack detection works and data is saved to Supabase
6. **Check** work orders created

---

## 🎯 **Demo Users**

```
Admin:     admin@roadsintel.com / password
Inspector: inspector@roadsintel.com / password
```

---

## 🆘 **Troubleshooting**

### **Supabase Issues:**
- **"Invalid API key"** → Check SUPABASE_ANON_KEY is correct
- **"Table doesn't exist"** → Run the SQL schema in Supabase
- **"RLS policy"** → Check Row Level Security policies

### **Railway Issues:**
- **"Build failed"** → Check Root Directory is set to `backend`
- **"Environment variables"** → Verify all required variables are set
- **"Port issues"** → Check PORT=3001 is set

### **Netlify Issues:**
- **"CORS error"** → Check FRONTEND_URL in Railway matches Netlify URL
- **"404 errors"** → Verify Railway URL in Netlify env variables
- **"Login fails"** → Check JWT_SECRET is set in Railway

---

## ✅ **Success Checklist**

Before expo, verify:
- [ ] Supabase project created and schema run
- [ ] Backend runs locally with Postman tests passing
- [ ] Backend deployed to Railway successfully
- [ ] Railway URL tested in Postman
- [ ] Netlify environment variable set
- [ ] Frontend redeployed
- [ ] Complete login → upload → detection flow works
- [ ] Data persists in Supabase database
- [ ] No CORS errors
- [ ] All pages load correctly

---

## 🎪 **Expo Demo Flow**

1. **"This is RoadsIntel - AI-powered road crack detection with real-time data"**
2. **Show Supabase dashboard** - real database
3. **Login** with admin credentials
4. **Upload road image** - see real crack detection
5. **Show Supabase** - data saved in real database
6. **Show work orders** - automatically created
7. **Show dashboard stats** - real-time data

**You're ready for the expo with a production-ready system! 🚀**
