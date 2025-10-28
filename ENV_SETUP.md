# Environment Variables Setup

## Local Development

Create a `.env.local` file in the root directory:

```env
# For local backend development
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# For Netlify serverless functions
# Leave empty or use Netlify's auto-generated URL
# NEXT_PUBLIC_BACKEND_URL=
```

## Production (Netlify)

### Option 1: Use Serverless Functions (Default - No Config Needed)

The app will automatically use Netlify serverless functions when deployed. No environment variables needed!

### Option 2: Use External Backend

If you have a separate backend server:

1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   ```
3. Redeploy

## Environment Detection

The app automatically detects which environment it's in:
- Local → Uses localhost backend
- Production without NEXT_PUBLIC_BACKEND_URL → Uses Netlify functions
- Production with NEXT_PUBLIC_BACKEND_URL → Uses your backend URL

## Backend Environment Variables

If running local backend (NestJS), create `.env` in `roadsintel-backend/`:

```env
DATABASE_URL="mysql://username:password@host:port/database"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
UPLOAD_PATH=./uploads
```

## Serverless Functions

No environment variables needed for serverless functions. They work out of the box!

## Testing Configuration

```bash
# Check environment variables
echo $NEXT_PUBLIC_BACKEND_URL

# Test locally
npm run dev

# Test production build
npm run build
npm start
```
