# API Configuration Fix Summary

## Problem
Your application was getting 404 errors because all dashboard pages were using **relative URLs** like `/api/space/...` which were trying to hit your Next.js server instead of your backend API.

## Solution
I've updated all 25 dashboard files to use the backend API properly by:

1. **Updated `lib/api-config.js`**
   - Added a `getApiUrl()` helper function that constructs full API URLs
   - Changed default backend URL from `'https://your-backend-api.com'` to `'http://localhost:3001'`

2. **Updated all dashboard files** (25 files total)
   - Added import: `import { getApiUrl } from "../../lib/api-config";`
   - Changed all `fetch("/api/...")` to `fetch(getApiUrl("/api/..."))`

## Files Updated

### Core Dashboard Files
- ✅ `app/dashboard/page.jsx`
- ✅ `app/dashboard/spaces/page.jsx`
- ✅ `app/dashboard/spaces/add/page.jsx`
- ✅ `app/dashboard/spaces/[id]/page.jsx`

### Asset Management
- ✅ `app/dashboard/assets/page.jsx`
- ✅ `app/dashboard/assets/add/page.jsx`
- ✅ `app/dashboard/asset-types/page.jsx`
- ✅ `app/dashboard/asset-types/add/page.jsx`
- ✅ `app/dashboard/asset-types/[id]/page.jsx`

### Organizations & Users
- ✅ `app/dashboard/organizations/page.jsx`
- ✅ `app/dashboard/organizations/add/page.jsx`
- ✅ `app/dashboard/organizations/[organizationId]/page.jsx`
- ✅ `app/dashboard/organizations/[organizationId]/roles/page.jsx`
- ✅ `app/dashboard/users/page.jsx`
- ✅ `app/dashboard/users/add/page.jsx`

### Other Features
- ✅ `app/dashboard/checklists/page.jsx`
- ✅ `app/dashboard/checklists/add/page.jsx`
- ✅ `app/dashboard/inspections/page.jsx`
- ✅ `app/dashboard/work-orders/page.jsx`
- ✅ `app/dashboard/reports/page.jsx`
- ✅ `app/dashboard/properties/page.jsx`
- ✅ `app/dashboard/space-types/page.jsx`

### Profile Management
- ✅ `app/dashboard/profile/page.jsx`
- ✅ `app/dashboard/profile/edit/page.jsx`
- ✅ `app/dashboard/profile/change-password/page.jsx`

## What You Need to Do

### 1. Set Your Backend URL

Create a `.env.local` file in your project root with your actual backend URL:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**For Development:**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
# or whatever port your backend runs on
```

**For Production:**
```env
NEXT_PUBLIC_BACKEND_URL=https://your-actual-backend-api.azurewebsites.net
# or your actual production backend URL
```

### 2. Restart Your Development Server

After creating the `.env.local` file, restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 3. Test the Application

1. Log in to your application
2. Navigate to the dashboard
3. Check if the 404 errors are gone
4. Verify that spaces, assets, organizations, etc. are loading correctly

## Environment Variables Explained

- **`NEXT_PUBLIC_BACKEND_URL`**: Used in client-side code (browser)
  - Must start with `NEXT_PUBLIC_` to be accessible in the browser
  - This is what your React components will use
  
- **`BACKEND_URL`**: Used in server-side code (optional)
  - If you add Next.js API routes that need to call your backend

## How It Works Now

**Before:**
```javascript
fetch("/api/space")  // ❌ Tries to call localhost:3000/api/space (Next.js server)
```

**After:**
```javascript
import { getApiUrl } from "../../lib/api-config";
fetch(getApiUrl("/api/space"))  // ✅ Calls http://localhost:3001/api/v1/space (Backend API)
```

**Note:** The `getApiUrl` helper automatically adds `/v1/` to match your backend's API versioning:
- Input: `/api/space` → Output: `http://your-backend/api/v1/space`
- Input: `/api/organization` → Output: `http://your-backend/api/v1/organization`

## Troubleshooting

### If you still see 404 errors:

1. **Check your backend is running:**
   ```bash
   # Make sure your backend API is running on the correct port
   ```

2. **Verify the backend URL:**
   - Check your `.env.local` file
   - Restart your Next.js server after changing `.env.local`

3. **Check the browser console:**
   - Open Developer Tools (F12)
   - Look at the Network tab
   - Verify the requests are going to the correct URL

### If you see CORS errors:

Your backend needs to allow requests from your frontend. Add CORS configuration to your backend:

```csharp
// In your .NET backend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // Your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Then in the middleware:
app.UseCors();
```

## Next Steps

1. Create the `.env.local` file with your backend URL
2. Restart your development server
3. Test your application
4. If everything works, you're done! ✨

If you encounter any issues, check:
- Is your backend API running?
- Is the URL in `.env.local` correct?
- Are there any CORS errors in the browser console?

