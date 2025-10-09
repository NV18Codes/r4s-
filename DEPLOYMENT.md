# 🚀 Netlify Deployment Guide for RoadsIntel Frontend

## 📋 Pre-Deployment Checklist

### ✅ Required Files Created
- [x] `netlify.toml` - Netlify configuration
- [x] `env.example` - Environment variables template
- [x] `public/_redirects` - SPA routing rules
- [x] `lib/api-config.js` - Production API configuration
- [x] `DEPLOYMENT.md` - This deployment guide

### ✅ Code Updates
- [x] Updated `package.json` with proper build scripts
- [x] Professional UI improvements completed
- [x] Back buttons added to auth pages
- [x] Responsive design implemented

## 🔧 Environment Variables Setup

### Required Environment Variables in Netlify:

1. **Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables**

2. **Add these variables:**

```bash
# Backend API Configuration
BACKEND_URL=https://your-actual-backend-url.com
NEXT_PUBLIC_BACKEND_URL=https://your-actual-backend-url.com

# Optional: Authentication
JWT_SECRET=your_jwt_secret_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here

# Environment
NODE_ENV=production
```

### 🔗 Backend URL Configuration:
- Replace `https://your-actual-backend-url.com` with your real backend URL
- Ensure your backend supports CORS for your Netlify domain
- Test API endpoints are accessible from production

## 🚀 Deployment Steps

### Method 1: Git Integration (Recommended)

1. **Push to Git Repository:**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, etc.)
   - Select your repository
   - Use these settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `.next`
     - **Node version:** `18`

3. **Configure Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add all required variables from the list above

### Method 2: Manual Deploy

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.next
   ```

## 🔧 Build Configuration

### Netlify Settings:
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** `18`
- **Functions directory:** `netlify/functions` (if using serverless functions)

### Build Process:
1. Netlify runs `npm install`
2. Runs `npm run build`
3. Publishes the `.next` directory
4. Applies redirect rules from `public/_redirects`

## 🌐 Domain Configuration

### Custom Domain (Optional):
1. Go to Site Settings → Domain Management
2. Add your custom domain
3. Configure DNS settings as instructed
4. Enable HTTPS (automatic with Netlify)

### Default Netlify Domain:
- Your site will be available at: `https://your-site-name.netlify.app`

## 🧪 Testing Your Deployment

### ✅ Test Checklist:

1. **Home Page:**
   - [ ] Landing page loads correctly
   - [ ] Navigation works
   - [ ] Responsive design on mobile/desktop

2. **Authentication:**
   - [ ] Login page loads
   - [ ] Signup page loads
   - [ ] Back buttons work
   - [ ] Form submissions work
   - [ ] API calls to backend succeed

3. **Dashboard:**
   - [ ] Dashboard loads after login
   - [ ] Sidebar navigation works
   - [ ] All pages are accessible
   - [ ] Data loads from backend APIs

4. **Features:**
   - [ ] User management
   - [ ] Space management
   - [ ] Asset management
   - [ ] Reports and analytics
   - [ ] File uploads (if applicable)

5. **Performance:**
   - [ ] Page load times are acceptable
   - [ ] Images and assets load correctly
   - [ ] No console errors

## 🐛 Common Issues & Solutions

### Issue 1: Build Failures
**Problem:** Build fails with errors
**Solution:**
- Check Node.js version (should be 18)
- Ensure all dependencies are in package.json
- Check for TypeScript errors
- Verify environment variables are set

### Issue 2: API Calls Failing
**Problem:** Frontend can't connect to backend
**Solution:**
- Verify BACKEND_URL environment variable
- Check CORS settings on backend
- Ensure backend is accessible from production
- Check network tab in browser dev tools

### Issue 3: Routing Issues
**Problem:** Direct URL access returns 404
**Solution:**
- Verify `public/_redirects` file is deployed
- Check Netlify redirects are working
- Ensure all routes are properly configured

### Issue 4: Environment Variables Not Working
**Problem:** Environment variables undefined
**Solution:**
- Ensure variables are set in Netlify dashboard
- Use NEXT_PUBLIC_ prefix for client-side variables
- Redeploy after adding environment variables

## 📊 Performance Optimization

### Netlify Features to Enable:
1. **Asset Optimization:**
   - Enable minification
   - Enable compression
   - Enable image optimization

2. **CDN:**
   - Automatic with Netlify
   - Global edge network

3. **Caching:**
   - Static assets cached automatically
   - API responses cached as configured

## 🔒 Security Considerations

### Headers Applied (via netlify.toml):
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Additional Security:
- HTTPS enabled by default
- Environment variables are secure
- No sensitive data in client-side code

## 📈 Monitoring & Analytics

### Recommended Tools:
1. **Netlify Analytics** (built-in)
2. **Google Analytics** (add GA_ID to env vars)
3. **Sentry** (for error tracking)
4. **Uptime monitoring**

## 🆘 Support & Troubleshooting

### Debug Steps:
1. Check Netlify build logs
2. Check browser console for errors
3. Verify environment variables
4. Test API endpoints manually
5. Check network connectivity

### Getting Help:
- Check Netlify documentation
- Review build logs in Netlify dashboard
- Test locally with production environment variables

## 🎉 Post-Deployment

### After Successful Deployment:
1. Test all major functionality
2. Share the URL with stakeholders
3. Set up monitoring and alerts
4. Configure custom domain (if needed)
5. Set up CI/CD for automatic deployments

---

## 📞 Quick Reference

**Netlify Dashboard:** https://app.netlify.com
**Your Site URL:** `https://your-site-name.netlify.app`
**Build Logs:** Netlify Dashboard → Deploys → Click on deploy
**Environment Variables:** Site Settings → Environment Variables
**Domain Management:** Site Settings → Domain Management

**Need Help?** Check the troubleshooting section above or review Netlify's documentation.
