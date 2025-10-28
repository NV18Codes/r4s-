# 🚀 API Quick Reference - Everything is SET UP!

## ✅ Current Status
- ✅ **Backend URL**: `https://r4s.onrender.com`
- ✅ **Backend Status**: Running and healthy
- ✅ **Supabase**: Connected
- ✅ **Frontend URL**: `https://roadsintel.netlify.app`

---

## 🔑 Important API Endpoints

### Base URL
```
https://r4s.onrender.com
```

### 1. Health Check
```
GET /health
Response: {"status": "OK", "supabase": "Connected"}
```

### 2. Login
```
POST /api/v1/User/signin
Headers: Content-Type: application/json
Body: { "email": "admin@roadsintel.com", "password": "password" }
```

### 3. Upload Image & Detect Cracks
```
POST /api/v1/images/upload
Headers: 
  - Authorization: Bearer {token}
  - Content-Type: multipart/form-data
Body: FormData with 'image' field
Response includes: inspection, workOrder, cracks, images
```

### 4. Get All Inspections
```
GET /api/v1/inspections
Headers: Authorization: Bearer {token}
```

### 5. Get Specific Inspection
```
GET /api/v1/inspections/{id}
Headers: Authorization: Bearer {token}
```

### 6. Get Work Orders for Inspection
```
GET /api/v1/inspections/{id}/workorders
Headers: Authorization: Bearer {token}
```

### 7. Get All Work Orders
```
GET /api/v1/workorders
Headers: Authorization: Bearer {token}
```

---

## 📝 Test Credentials
```
Email: admin@roadsintel.com
Password: password
```

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Import `RoadsIntel_Production_Postman_Collection.json`
3. Set environment variable:
   - `baseURL` = `https://r4s.onrender.com`

### Test Flow
1. **Login** → Get JWT token
2. **Upload Image** → Upload road image, get inspection + work order
3. **Get Inspections** → View all inspections
4. **Get Work Orders** → View all work orders

---

## 🔧 If Backend is Down

### Check Status
```bash
curl https://r4s.onrender.com/health
```

### Restart Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Find service: `r4s-backend`
3. Click "Manual Deploy" → "Deploy latest commit"

---

## 📊 Response Format
All API responses follow this structure:
```json
{
  "meta": {
    "status": "Success" | "Error",
    "messages": [{ "text": "Message here" }]
  },
  "data": { ... }
}
```

---

## ✅ Everything is Ready!
Your APIs are deployed and working. Just login and start using the app!

**Frontend**: https://roadsintel.netlify.app
**Backend**: https://r4s.onrender.com
**Status**: ✅ OPERATIONAL
