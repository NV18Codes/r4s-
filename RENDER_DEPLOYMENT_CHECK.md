# 🔧 Render Deployment Check - Backend Not Getting Latest Code

## Issue
The backend on Render (`https://r4s.onrender.com`) is returning 404 for these endpoints:
- `/api/v1/inspections/:id`
- `/api/v1/inspections/:id/workorders`

But these endpoints exist in `backend/server.js`!

## Root Cause
Render is likely:
1. Deploying from the wrong branch
2. Using cached/old code
3. Root directory not configured correctly

---

## ⚡ Quick Fix - Manual Deployment

### Option 1: Force Redeploy on Render (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Find your `r4s` service (or whatever it's named)
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment to complete (2-3 minutes)

### Option 2: Check Render Configuration
Go to Settings → Service Settings:

**Required Settings:**
```
Root Directory: backend
Build Command: cd backend && npm install
Start Command: cd backend && node server.js
Branch: main (or your working branch)
```

---

## 🧪 Verify Backend Has Latest Code

After redeployment, test these endpoints:

### 1. Check Health
```bash
curl https://r4s.onrender.com/health
```

### 2. Check Inspections Endpoint Exists
```bash
# This should return the endpoint (even if it needs auth)
curl https://r4s.onrender.com/api/v1/inspections

# Expected: 401 Unauthorized (not 404 Not Found)
```

### 3. Test with Auth Token
```bash
# First get token
curl -X POST https://r4s.onrender.com/api/v1/User/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@roadsintel.com","password":"password"}'

# Then use token to test inspection endpoint
curl https://r4s.onrender.com/api/v1/inspections \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 If Render Service Doesn't Exist

### Create New Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect repository: `https://github.com/NV18Codes/r4s-.git`
4. Configure:
   ```
   Name: r4s-backend
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   Instance Type: Free
   ```
5. Add Environment Variables:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-key
   JWT_SECRET=roadsintel-production-secret-key-2024
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://roadsintel.netlify.app
   ```

---

## 🔍 Debug Steps

### Check What Render is Actually Deploying
1. Go to Render Dashboard
2. Click on your service
3. Open "Logs" tab
4. Look for build logs - check what files are being installed
5. Check if `server.js` is in the build

### Check Render is Using Correct Branch
1. Settings → Branch
2. Make sure it's set to `main` (or `crack-detection` if that's where your code is)

### Force Clear Build Cache
1. Render doesn't have a built-in cache clear
2. You can trigger a redeploy by:
   - Making a small commit (add/remove a space)
   - Pushing to GitHub
   - Render should auto-deploy

---

## ✅ Expected Behavior After Fix

Once Render has the latest code, these endpoints should work:

```
GET  /api/v1/inspections              → 200 OK (list of inspections)
GET  /api/v1/inspections/:id          → 200 OK (specific inspection)
GET  /api/v1/inspections/:id/workorders → 200 OK (work orders for inspection)
POST /api/v1/images/upload            → 201 Created (upload image + detect)
GET  /api/v1/workorders               → 200 OK (all work orders)
```

---

## 🚨 Immediate Workaround

If you need it working NOW and can't wait for Render:

### Run Backend Locally
```bash
cd backend
npm install
node server.js
```

Then update frontend to use:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

(Only for testing - won't work from production Netlify site)

---

## 📊 Current Backend Status
- **URL**: https://r4s.onrender.com
- **Health**: ✅ Working
- **New Endpoints**: ❌ Not deployed yet
- **Fix**: Manual redeploy needed

---

**Action Required**: Go to Render and manually trigger a redeploy!
