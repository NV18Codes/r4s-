# 🧪 Postman API Testing Guide

## 📋 Complete API Testing Workflow

### **Step 1: Setup Environment Variables**

In Postman, set these variables:
```
base_url: https://r4s.onrender.com
auth_token: (get this from login)
```

### **Step 2: Authentication**
1. **Login** → Get auth token
2. **Copy token** from response
3. **Set auth_token** variable

### **Step 3: Test Image Upload & Detection**

#### **Upload Image with Crack Detection:**
```
POST {{base_url}}/api/v1/images/upload
Headers:
- Authorization: Bearer {{auth_token}}
Body: form-data
- image: [select image file]
```

**Expected Response:**
```json
{
  "meta": {
    "status": "Success",
    "message": "Image processed successfully"
  },
  "data": {
    "inspection": {
      "id": "uuid",
      "name": "Road Inspection - filename.jpg",
      "original_image_url": "https://...",
      "annotated_image_url": "https://...",
      "crack_count": 3,
      "crack_severity": "Medium",
      "crack_data": [...]
    },
    "workOrder": {
      "id": "uuid",
      "title": "Repair 3 crack(s) - Medium Priority",
      "status": "Open"
    },
    "cracks": [...],
    "crackCount": 3,
    "severity": "Medium",
    "originalImageUrl": "https://...",
    "message": "AI Detection complete! Found 3 crack(s) with Medium severity."
  }
}
```

### **Step 4: Test Image Management APIs**

#### **Get All Inspections:**
```
GET {{base_url}}/api/v1/inspections
Headers:
- Authorization: Bearer {{auth_token}}
- Content-Type: application/json
```

#### **Get Specific Inspection:**
```
GET {{base_url}}/api/v1/inspections/INSPECTION_ID
Headers:
- Authorization: Bearer {{auth_token}}
- Content-Type: application/json
```

#### **Download Image:**
```
GET {{base_url}}/api/v1/images/FILENAME
Headers:
- Authorization: Bearer {{auth_token}}
```

#### **Get Work Orders:**
```
GET {{base_url}}/api/v1/inspections/INSPECTION_ID/workorders
Headers:
- Authorization: Bearer {{auth_token}}
- Content-Type: application/json
```

### **Step 5: Test Complete Workflow**

1. **Login** → Get token
2. **Upload image** → Get inspection ID
3. **Get inspection details** → Verify image URLs
4. **Download image** → Test file download
5. **Get work orders** → Verify auto-creation
6. **Get all inspections** → See image thumbnails

---

## 🎯 Key Testing Points:

### **Image Upload:**
- ✅ File uploads successfully
- ✅ AI detection runs
- ✅ Crack data generated
- ✅ Images stored in Supabase
- ✅ Work order created (if cracks > 0)

### **Image Management:**
- ✅ Original image URL accessible
- ✅ Annotated image URL accessible
- ✅ Download functionality works
- ✅ Image thumbnails display

### **Work Orders:**
- ✅ Auto-created when cracks detected
- ✅ Linked to inspection
- ✅ Priority based on severity
- ✅ Status set to "Open"

### **Data Persistence:**
- ✅ Inspection saved to database
- ✅ Images stored in Supabase Storage
- ✅ Crack data as JSON
- ✅ Work orders linked properly

---

## 🚀 Demo Flow:

1. **Login** with `admin@roadsintel.com` / `password`
2. **Upload road image** (any image file)
3. **See AI detection results** with crack annotations
4. **Download both images** (original and annotated)
5. **Check work orders** created automatically
6. **Browse inspection history** with thumbnails

---

## 📊 Expected Data Structure:

### **Inspection Response:**
```json
{
  "id": "uuid",
  "name": "Road Inspection - filename.jpg",
  "description": "AI-powered crack detection analysis",
  "original_image_url": "https://supabase-url/road-images/filename",
  "annotated_image_url": "https://supabase-url/road-images/filename",
  "image_filename": "road-timestamp-filename.jpg",
  "crack_count": 3,
  "crack_severity": "Medium",
  "crack_data": [
    {
      "id": 1,
      "x": 150,
      "y": 200,
      "width": 80,
      "height": 40,
      "points": [...],
      "confidence": 0.85,
      "type": "linear"
    }
  ],
  "status": "Completed",
  "inspector": "Admin User",
  "inspection_date": "2024-01-28T...",
  "created_at": "2024-01-28T..."
}
```

**Ready to test! Import the updated Postman collection and follow this guide! 🎉**
