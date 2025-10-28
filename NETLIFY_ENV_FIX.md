# 🔧 Fix Netlify Environment Variable

## ⚠️ Current Issue:
Frontend is calling `localhost:3001` because `NEXT_PUBLIC_BACKEND_URL` is not set in Netlify.

## ✅ Quick Fix:

### **Update Netlify Environment Variable:**

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your **RoadsIntel** site
3. Go to **Site Settings** → **Environment Variables**
4. Click **"Add variable"**
5. Add:
   - **Key:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** `https://r4s.onrender.com`
6. Click **"Save"**

### **Redeploy:**

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait 2-3 minutes for deployment

### **Test:**

After deployment, your frontend will use the Render backend!

**This will fix all the 404 errors! 🚀**

