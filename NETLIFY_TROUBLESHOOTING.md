# Netlify Build Troubleshooting Guide

## Current Status
- ✅ Local build: SUCCESSFUL
- ✅ Dependencies: All installed correctly  
- ✅ Next.js: Updated to 14.2.33 (security fixes)
- ✅ Configuration: netlify.toml properly formatted
- ❌ Netlify build: Still failing with truncated logs

## Steps to Get Full Netlify Logs

### 1. Enable Debug Logging
The netlify.toml already has `NETLIFY_BUILD_DEBUG = "true"` but you can also set it in Netlify UI:

**Netlify Dashboard → Site Settings → Build & Deploy → Environment Variables:**
- Add: `NETLIFY_BUILD_DEBUG` = `true`
- Add: `NODE_VERSION` = `18`
- Add: `NEXT_PUBLIC_BACKEND_URL` = `https://r4s.onrender.com`

### 2. Manual Deploy Trigger
Instead of auto-deploy, try manual deploy:
1. Go to Netlify Dashboard → Deploys
2. Click "Trigger deploy" → "Deploy site"
3. This often shows more detailed logs than auto-deploys

### 3. Check Build Settings
Verify these settings in Netlify Dashboard → Site Settings → Build & Deploy:

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `18`

**Environment Variables:**
- `NODE_VERSION` = `18`
- `NETLIFY_BUILD_DEBUG` = `true`
- `NEXT_PUBLIC_BACKEND_URL` = `https://r4s.onrender.com`

### 4. Alternative: Use Netlify CLI
If web UI logs are truncated, try Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy with verbose logging
netlify deploy --prod --dir=.next --build
```

## Common Netlify Issues & Fixes

### Issue 1: Missing package-lock.json
**Fix:** Ensure package-lock.json is committed
```bash
git add package-lock.json
git commit -m "Add package-lock.json for reproducible builds"
git push origin main
```

### Issue 2: Node Version Mismatch
**Fix:** Create .nvmrc file
```bash
echo "18" > .nvmrc
git add .nvmrc
git commit -m "Add Node version specification"
git push origin main
```

### Issue 3: Build Command Issues
**Fix:** Verify package.json build script exists
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

### Issue 4: Environment Variables Missing
**Fix:** Set in Netlify UI or netlify.toml
```toml
[build.environment]
  NODE_VERSION = "18"
  NEXT_PUBLIC_BACKEND_URL = "https://r4s.onrender.com"
```

## Next Steps

1. **Try manual deploy** in Netlify UI
2. **Check environment variables** are set correctly
3. **Verify build settings** match the configuration
4. **If still failing**, use Netlify CLI for detailed logs
5. **Share the full error log** (last 100-200 lines)

## Expected Build Output
The build should show:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (33/33)
✓ Collecting build traces
✓ Finalizing page optimization
```

If you see different output, that's the error we need to fix.
