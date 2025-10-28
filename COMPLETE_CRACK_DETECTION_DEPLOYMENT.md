# Complete Crack Detection Deployment Guide

This guide will help you deploy the entire crack detection system to Netlify with all features working perfectly.

## 🎯 Overview

The crack detection system consists of:
- **Frontend**: Next.js application for uploading images and viewing results
- **Backend**: Serverless functions for processing images and detecting cracks
- **Database**: In-memory storage for demo (can be upgraded to persistent storage)

## 📋 Prerequisites

- Git repository connected to Netlify
- Netlify account
- Node.js 18+ installed locally

## 🚀 Deployment Steps

### Step 1: Local Development Setup

#### Option A: Local Backend (Full Feature Testing)

1. **Set up the NestJS Backend:**

```bash
cd roadsintel-backend

# Create .env file
cat > .env << EOF
DATABASE_URL="mysql://dev45:YOUR_PASSWORD@89.116.25.62:3306/roadsintel?schema=public_INTEGERS"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
UPLOAD_PATH=./uploads
EOF

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start backend
npm run start:dev
```

The backend will run on `http://localhost:3001`

2. **Start Frontend:**

```bash
cd ..

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

#### Option B: Serverless Functions Only

The serverless functions in `netlify/functions/` will work automatically when deployed to Netlify without any backend setup.

### Step 2: Test Locally

1. Go to `http://localhost:3000/dashboard/inspections`
2. Click "Upload Road Image"
3. Select an image file
4. Click "Upload & Analyze"
5. You should see the detection results with crack count

### Step 3: Deploy to Netlify

#### Method 1: Git Integration (Recommended)

1. **Commit your changes:**

```bash
git add .
git commit -m "Add crack detection with Netlify serverless functions"
git push origin main
```

2. **Connect to Netlify:**

   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose your Git provider
   - Select your repository
   - Use these settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `.next`
     - **Node version:** `18`

3. **Configure Environment Variables:**

   In Netlify Dashboard → Site Settings → Environment Variables, add:

   ```bash
   NEXT_PUBLIC_BACKEND_URL=https://your-site-name.netlify.app
   NODE_ENV=production
   ```

4. **Deploy:**

   Netlify will automatically build and deploy your site.

#### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run build
netlify deploy --prod
```

### Step 4: Test Production Deployment

1. Go to your Netlify URL (e.g., `https://your-site-name.netlify.app`)
2. Navigate to Dashboard → Inspections
3. Upload an image
4. Check the detection results

## 🧪 Testing All Features

### Test Checklist:

- [ ] **Frontend loads successfully**
  - Home page displays
  - Navigation works
  
- [ ] **Authentication works**
  - Can login
  - Can signup
  - Redirects to dashboard

- [ ] **Crack Detection Upload**
  - Can select image file
  - Upload button is enabled
  - Image uploads successfully
  - Detection results appear
  - Shows crack count

- [ ] **Status Polling**
  - Status updates from "processing" to "completed"
  - Crack count displays correctly
  - Confidence score shows

- [ ] **Work Orders**
  - Work orders created automatically when cracks detected
  - Work orders visible in dashboard

- [ ] **Cross-Origin Requests**
  - No CORS errors in console
  - API calls succeed

## 🔧 Troubleshooting

### Issue: Build Fails on Netlify

**Solution:**
- Check Node.js version (should be 18)
- Verify all dependencies are in package.json
- Check build logs for specific errors
- Ensure environment variables are set

### Issue: Crack Detection Not Working

**Possible Causes:**
1. Serverless functions not deployed
2. Wrong API endpoint
3. CORS configuration

**Solution:**
```bash
# Check if functions are deployed
# Go to Netlify Dashboard → Functions
# Verify upload-image function exists

# Test function directly
curl -X POST https://your-site.netlify.app/.netlify/functions/upload-image
```

### Issue: Image Upload Fails

**Possible Causes:**
1. File size too large
2. Wrong content type
3. Network error

**Solution:**
- Check browser console for errors
- Verify file is image type
- Test with smaller image (< 5MB)
- Check network tab in DevTools

### Issue: Environment Variables Not Working

**Solution:**
- Ensure variables have `NEXT_PUBLIC_` prefix for client-side
- Redeploy after adding environment variables
- Check variable names match exactly

## 📊 Architecture

### Local Development:
```
Frontend (localhost:3000) → Backend (localhost:3001) → MySQL Database
```

### Production (Netlify):
```
Frontend (Netlify) → Netlify Functions → In-Memory Storage
```

## 🔄 Upgrading to Production Database

For production use, replace in-memory storage with a real database:

### Option 1: Upstash Redis (Recommended)

```bash
npm install @upstash/redis
```

Update `netlify/functions/upload-image.js`:

```javascript
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

// Use redis instead of imageStore Map
```

### Option 2: Supabase

```bash
npm install @supabase/supabase-js
```

## 🎯 Demo Script

Here's how to demonstrate all features working:

1. **Home Page Demo:**
   - Show landing page
   - Navigate to login

2. **Authentication Demo:**
   - Login with credentials
   - Show dashboard

3. **Crack Detection Demo:**
   - Go to Inspections page
   - Click "Upload Road Image"
   - Upload a road image
   - Show detection results
   - Explain crack count and confidence

4. **Work Orders Demo:**
   - Show automatically created work orders
   - Explain priority based on crack count

5. **API Calls Demo:**
   - Open browser DevTools → Network tab
   - Show successful API calls
   - Demonstrate real-time status updates

## 📝 Environment Variables Reference

### Required for Local Development:
```bash
# .env.local or .env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### Required for Production (Netlify):
```bash
# Netlify Environment Variables
NEXT_PUBLIC_BACKEND_URL=https://your-site.netlify.app
NODE_ENV=production
```

### Optional (for persistent storage):
```bash
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token
```

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Site loads on Netlify URL
- ✅ Can login/signup
- ✅ Can upload images
- ✅ Crack detection works
- ✅ Results display correctly
- ✅ No console errors
- ✅ API calls succeed
- ✅ All features functional

## 🆘 Support

If you encounter issues:
1. Check Netlify build logs
2. Check browser console for errors
3. Verify environment variables
4. Test functions individually
5. Review this guide

## 🎉 Next Steps

After successful deployment:
1. Add real YOLOv8 model for accurate crack detection
2. Implement persistent database storage
3. Add image visualization with crack markers
4. Add historical tracking and analytics
5. Implement user notifications
6. Add batch processing for multiple images

---

**Ready to deploy!** Follow the steps above and your crack detection system will be live on Netlify.
