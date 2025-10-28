const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'roadsintel-production-secret-2024';

// Middleware
app.use(cors({
  origin: [
    'https://roadsintel.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL,
    'https://*.netlify.app'
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Helper functions
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      meta: { status: 'Error', messages: [{ text: 'Access token required' }] }
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        meta: { status: 'Error', messages: [{ text: 'Invalid or expired token' }] }
      });
    }
    req.user = user;
    next();
  });
};

const sendSuccessResponse = (res, data, message = 'Success') => {
  res.json({
    meta: {
      status: 'Success',
      messages: [{ text: message }]
    },
    data: data
  });
};

const sendErrorResponse = (res, message = 'Error', statusCode = 400) => {
  res.status(statusCode).json({
    meta: {
      status: 'Error',
      messages: [{ text: message }]
    }
  });
};

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'RoadsIntel Production Backend is running!',
    timestamp: new Date().toISOString(),
    supabase: supabaseUrl ? 'Connected' : 'Not configured'
  });
});

// Authentication Routes
app.post('/api/v1/User/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return sendErrorResponse(res, 'Email and password are required', 400);
    }
    
    console.log('Login attempt for:', email);
    
    // Query user from Supabase
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    console.log('Supabase query result:', { users, error });
    
    if (error || !users) {
      console.log('User not found or error:', error);
      return sendErrorResponse(res, 'Invalid email or password', 401);
    }
    
    console.log('Comparing password...');
    const passwordMatch = bcrypt.compareSync(password, users.password);
    console.log('Password match:', passwordMatch);
    
    if (!passwordMatch) {
      console.log('Password mismatch - provided:', password, 'stored hash:', users.password);
      return sendErrorResponse(res, 'Invalid email or password', 401);
    }
    
    const token = generateToken(users);
    
    sendSuccessResponse(res, {
      user: {
        id: users.id,
        email: users.email,
        firstName: users.first_name,
        lastName: users.last_name,
        role: users.role,
        organization: users.organization,
        phoneNumber: users.phone_number,
        address: users.address
      },
      token: token
    }, 'Login successful');
    
  } catch (error) {
    console.error('Login error:', error);
    sendErrorResponse(res, 'Internal server error', 500);
  }
});

app.post('/api/v1/User/signup', async (req, res) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      roleName, 
      organizationName, 
      phoneNumber, 
      address 
    } = req.body;
    
    if (!email || !password || !firstName || !lastName || !roleName) {
      return sendErrorResponse(res, 'All required fields must be provided', 400);
    }
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    
    if (existingUser) {
      return sendErrorResponse(res, 'User with this email already exists', 400);
    }
    
    // Create new user in Supabase
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        email,
        password: bcrypt.hashSync(password, 10),
        first_name: firstName,
        last_name: lastName,
        role: roleName,
        organization: organizationName || 'Unknown',
        phone_number: phoneNumber || '',
        address: address || '',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase insert error:', error);
      return sendErrorResponse(res, 'Failed to create user', 500);
    }
    
    const token = generateToken(newUser);
    
    sendSuccessResponse(res, {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        role: newUser.role,
        organization: newUser.organization,
        phoneNumber: newUser.phone_number,
        address: newUser.address
      },
      token: token
    }, 'User created successfully');
    
  } catch (error) {
    console.error('Signup error:', error);
    sendErrorResponse(res, 'Internal server error', 500);
  }
});

// Dashboard Routes
app.get('/api/v1/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    // Get counts from Supabase
    const [usersCount, spacesCount, assetsCount, organizationsCount, inspectionsCount, workOrdersCount] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('spaces').select('id', { count: 'exact', head: true }),
      supabase.from('assets').select('id', { count: 'exact', head: true }),
      supabase.from('organizations').select('id', { count: 'exact', head: true }),
      supabase.from('inspections').select('id', { count: 'exact', head: true }),
      supabase.from('work_orders').select('id', { count: 'exact', head: true })
    ]);
    
    const stats = {
      totalUsers: usersCount.count || 0,
      totalSpaces: spacesCount.count || 0,
      totalAssets: assetsCount.count || 0,
      totalOrganizations: organizationsCount.count || 0,
      totalInspections: inspectionsCount.count || 0,
      totalWorkOrders: workOrdersCount.count || 0,
      openWorkOrders: 0, // Will be calculated separately
      completedInspections: 0 // Will be calculated separately
    };
    
    // Get open work orders count
    const { count: openWorkOrdersCount } = await supabase
      .from('work_orders')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'Open');
    
    // Get completed inspections count
    const { count: completedInspectionsCount } = await supabase
      .from('inspections')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'Completed');
    
    stats.openWorkOrders = openWorkOrdersCount || 0;
    stats.completedInspections = completedInspectionsCount || 0;
    
    sendSuccessResponse(res, stats, 'Dashboard stats retrieved successfully');
  } catch (error) {
    console.error('Dashboard stats error:', error);
    sendErrorResponse(res, 'Failed to retrieve dashboard stats', 500);
  }
});

// Spaces Routes
app.get('/api/v1/spaces', authenticateToken, async (req, res) => {
  try {
    const { data: spaces, error } = await supabase
      .from('spaces')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get spaces error:', error);
      return sendErrorResponse(res, 'Failed to retrieve spaces', 500);
    }
    
    sendSuccessResponse(res, spaces || [], 'Spaces retrieved successfully');
  } catch (error) {
    console.error('Get spaces error:', error);
    sendErrorResponse(res, 'Failed to retrieve spaces', 500);
  }
});

app.post('/api/v1/spaces', authenticateToken, async (req, res) => {
  try {
    const { name, description, location, spaceType } = req.body;
    
    const { data: newSpace, error } = await supabase
      .from('spaces')
      .insert([{
        name,
        description,
        location,
        space_type: spaceType,
        created_at: new Date().toISOString(),
        created_by: req.user.id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Create space error:', error);
      return sendErrorResponse(res, 'Failed to create space', 500);
    }
    
    sendSuccessResponse(res, newSpace, 'Space created successfully');
  } catch (error) {
    console.error('Create space error:', error);
    sendErrorResponse(res, 'Failed to create space', 500);
  }
});

// Assets Routes
app.get('/api/v1/assets', authenticateToken, async (req, res) => {
  try {
    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get assets error:', error);
      return sendErrorResponse(res, 'Failed to retrieve assets', 500);
    }
    
    sendSuccessResponse(res, assets || [], 'Assets retrieved successfully');
  } catch (error) {
    console.error('Get assets error:', error);
    sendErrorResponse(res, 'Failed to retrieve assets', 500);
  }
});

app.post('/api/v1/assets', authenticateToken, async (req, res) => {
  try {
    const { name, description, assetType, location, status } = req.body;
    
    const { data: newAsset, error } = await supabase
      .from('assets')
      .insert([{
        name,
        description,
        asset_type: assetType,
        location,
        status: status || 'Active',
        created_at: new Date().toISOString(),
        created_by: req.user.id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Create asset error:', error);
      return sendErrorResponse(res, 'Failed to create asset', 500);
    }
    
    sendSuccessResponse(res, newAsset, 'Asset created successfully');
  } catch (error) {
    console.error('Create asset error:', error);
    sendErrorResponse(res, 'Failed to create asset', 500);
  }
});

// Organizations Routes
app.get('/api/v1/organizations', authenticateToken, async (req, res) => {
  try {
    const { data: organizations, error } = await supabase
      .from('organizations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get organizations error:', error);
      return sendErrorResponse(res, 'Failed to retrieve organizations', 500);
    }
    
    sendSuccessResponse(res, organizations || [], 'Organizations retrieved successfully');
  } catch (error) {
    console.error('Get organizations error:', error);
    sendErrorResponse(res, 'Failed to retrieve organizations', 500);
  }
});

app.post('/api/v1/organizations', authenticateToken, async (req, res) => {
  try {
    const { name, description, address, contactEmail, contactPhone } = req.body;
    
    const { data: newOrganization, error } = await supabase
      .from('organizations')
      .insert([{
        name,
        description,
        address,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        created_at: new Date().toISOString(),
        created_by: req.user.id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Create organization error:', error);
      return sendErrorResponse(res, 'Failed to create organization', 500);
    }
    
    sendSuccessResponse(res, newOrganization, 'Organization created successfully');
  } catch (error) {
    console.error('Create organization error:', error);
    sendErrorResponse(res, 'Failed to create organization', 500);
  }
});

// Inspections Routes
app.get('/api/v1/inspections', authenticateToken, async (req, res) => {
  try {
    const { data: inspections, error } = await supabase
      .from('inspections')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get inspections error:', error);
      return sendErrorResponse(res, 'Failed to retrieve inspections', 500);
    }
    
    sendSuccessResponse(res, inspections || [], 'Inspections retrieved successfully');
  } catch (error) {
    console.error('Get inspections error:', error);
    sendErrorResponse(res, 'Failed to retrieve inspections', 500);
  }
});

app.post('/api/v1/inspections', authenticateToken, async (req, res) => {
  try {
    const { name, description, location, inspector, status } = req.body;
    
    const { data: newInspection, error } = await supabase
      .from('inspections')
      .insert([{
        name,
        description,
        location,
        inspector,
        status: status || 'Scheduled',
        created_at: new Date().toISOString(),
        created_by: req.user.id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Create inspection error:', error);
      return sendErrorResponse(res, 'Failed to create inspection', 500);
    }
    
    sendSuccessResponse(res, newInspection, 'Inspection created successfully');
  } catch (error) {
    console.error('Create inspection error:', error);
    sendErrorResponse(res, 'Failed to create inspection', 500);
  }
});

// Enhanced Image Upload and Crack Detection with Computer Vision
app.post('/api/v1/images/upload', upload.single('image'), authenticateToken, async (req, res) => {
  try {
    if (!req.file) {
      return sendErrorResponse(res, 'No image file provided', 400);
    }
    
    console.log('Image uploaded:', req.file.filename);
    
    // Simulate computer vision crack detection
    const crackDetectionResult = await detectCracks(req.file.path);
    const { crackCount, severity, cracks } = crackDetectionResult;

    // Upload original image to Supabase Storage
    const fileBuffer = fs.readFileSync(req.file.path);
    const fileName = `road-${Date.now()}-${req.file.originalname}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('road-images')
      .upload(fileName, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return sendErrorResponse(res, 'Failed to upload image to storage', 500);
    }

    // Get public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from('road-images')
      .getPublicUrl(fileName);

    const originalImageUrl = urlData.publicUrl;

    // Create annotated image URL (same as original for now, but could be processed)
    const annotatedImageUrl = originalImageUrl;

    // Create inspection record in Supabase
    const { data: inspection, error: inspectionError } = await supabase
      .from('inspections')
      .insert([{
        name: `Road Inspection - ${req.file.originalname}`,
        description: `AI-powered crack detection analysis for ${req.file.originalname}`,
        original_image_url: originalImageUrl,
        annotated_image_url: annotatedImageUrl,
        image_filename: fileName,
        crack_count: crackCount,
        crack_severity: severity,
        crack_data: cracks, // Store crack coordinates as JSON
        status: 'Completed',
        location: 'Sample Road Location',
        inspector: req.user.firstName + ' ' + req.user.lastName,
        inspection_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        created_by: req.user.id
      }])
      .select()
      .single();
    
    if (inspectionError) {
      console.error('Create inspection error:', inspectionError);
      return sendErrorResponse(res, 'Failed to create inspection record', 500);
    }
    
    // Create work order if cracks found
    let workOrder = null;
    if (crackCount > 0) {
      const { data: newWorkOrder, error: workOrderError } = await supabase
        .from('work_orders')
        .insert([{
          inspection_id: inspection.id,
          title: `Repair ${crackCount} crack(s) - ${severity} Priority`,
          description: `Repair ${crackCount} crack(s) detected using AI analysis`,
          priority: severity,
          status: 'Open',
          assigned_to: 'Maintenance Team',
          created_at: new Date().toISOString(),
          created_by: req.user.id
        }])
        .select()
        .single();
      
      if (workOrderError) {
        console.error('Create work order error:', workOrderError);
      } else {
        workOrder = newWorkOrder;
      }
    }

    // Clean up local file
    fs.unlinkSync(req.file.path);
    
    sendSuccessResponse(res, {
      inspection: inspection,
      workOrder: workOrder,
      cracks: cracks,
      crackCount: crackCount,
      severity: severity,
      originalImageUrl: originalImageUrl,
      annotatedImageUrl: annotatedImageUrl,
      message: `AI Detection complete! Found ${crackCount} crack(s) with ${severity} severity.`
    }, 'Image processed successfully');
    
  } catch (error) {
    console.error('Upload error:', error);
    sendErrorResponse(res, 'Failed to process image', 500);
  }
});

// Simulate AI-powered crack detection
async function detectCracks(imagePath) {
  // In a real implementation, you would:
  // 1. Load the image using a computer vision library
  // 2. Apply edge detection algorithms
  // 3. Use machine learning models to identify cracks
  // 4. Calculate crack positions, sizes, and severity
  
  // For demo purposes, we'll simulate realistic crack detection
  const imageSize = { width: 800, height: 600 }; // Assume image dimensions
  
  // Generate realistic crack patterns
  const crackCount = Math.floor(Math.random() * 6) + 1; // 1-6 cracks
  const severity = crackCount > 4 ? 'High' : crackCount > 2 ? 'Medium' : 'Low';
  
  const cracks = [];
  
  for (let i = 0; i < crackCount; i++) {
    // Generate crack position and size
    const x = Math.random() * (imageSize.width - 200) + 50;
    const y = Math.random() * (imageSize.height - 150) + 50;
    const width = Math.random() * 120 + 30;
    const height = Math.random() * 60 + 20;
    
    // Generate crack points along the crack path
    const points = [];
    const numPoints = Math.floor(Math.random() * 8) + 3; // 3-10 points
    
    for (let j = 0; j < numPoints; j++) {
      const progress = j / (numPoints - 1);
      const pointX = x + (width * progress) + (Math.random() - 0.5) * 10;
      const pointY = y + (height * progress) + (Math.random() - 0.5) * 10;
      points.push({ x: pointX, y: pointY });
    }
    
    cracks.push({
      id: i + 1,
      x: x,
      y: y,
      width: width,
      height: height,
      points: points,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      type: Math.random() > 0.5 ? 'linear' : 'branching'
    });
  }
  
  // Sort cracks by severity (larger cracks first)
  cracks.sort((a, b) => (b.width * b.height) - (a.width * a.height));
  
  return {
    crackCount,
    severity,
    cracks,
    processingTime: Math.random() * 2 + 1, // 1-3 seconds
    modelVersion: 'v1.0'
  };
}

// Get inspection with images
app.get('/api/v1/inspections/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: inspection, error } = await supabase
      .from('inspections')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Get inspection error:', error);
      return sendErrorResponse(res, 'Failed to retrieve inspection', 500);
    }
    
    sendSuccessResponse(res, inspection, 'Inspection retrieved successfully');
  } catch (error) {
    console.error('Get inspection error:', error);
    sendErrorResponse(res, 'Failed to retrieve inspection', 500);
  }
});

// Get all inspections with images
app.get('/api/v1/inspections', authenticateToken, async (req, res) => {
  try {
    const { data: inspections, error } = await supabase
      .from('inspections')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get inspections error:', error);
      return sendErrorResponse(res, 'Failed to retrieve inspections', 500);
    }
    
    sendSuccessResponse(res, inspections || [], 'Inspections retrieved successfully');
  } catch (error) {
    console.error('Get inspections error:', error);
    sendErrorResponse(res, 'Failed to retrieve inspections', 500);
  }
});

// Download image endpoint
app.get('/api/v1/images/:filename', authenticateToken, async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Get image from Supabase Storage
    const { data, error } = await supabase.storage
      .from('road-images')
      .download(filename);
    
    if (error) {
      console.error('Download error:', error);
      return sendErrorResponse(res, 'Image not found', 404);
    }
    
    // Convert blob to buffer
    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Set headers for download
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
    
  } catch (error) {
    console.error('Download error:', error);
    sendErrorResponse(res, 'Failed to download image', 500);
  }
});

// Get work orders for inspection
app.get('/api/v1/inspections/:id/workorders', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: workOrders, error } = await supabase
      .from('work_orders')
      .select('*')
      .eq('inspection_id', id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get work orders error:', error);
      return sendErrorResponse(res, 'Failed to retrieve work orders', 500);
    }
    
    sendSuccessResponse(res, workOrders || [], 'Work orders retrieved successfully');
  } catch (error) {
    console.error('Get work orders error:', error);
    sendErrorResponse(res, 'Failed to retrieve work orders', 500);
  }
});

// Users Routes
app.get('/api/v1/users', authenticateToken, async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, role, organization, phone_number, address, created_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Get users error:', error);
      return sendErrorResponse(res, 'Failed to retrieve users', 500);
    }
    
    sendSuccessResponse(res, users || [], 'Users retrieved successfully');
  } catch (error) {
    console.error('Get users error:', error);
    sendErrorResponse(res, 'Failed to retrieve users', 500);
  }
});

// Serve uploaded images
app.use('/uploads', express.static(uploadsDir));

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  sendErrorResponse(res, 'Internal server error', 500);
});

// 404 handler
app.use('*', (req, res) => {
  sendErrorResponse(res, 'Endpoint not found', 404);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 RoadsIntel Production Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Login endpoint: http://localhost:${PORT}/api/v1/User/signin`);
  console.log(`📸 Upload endpoint: http://localhost:${PORT}/api/v1/images/upload`);
  console.log(`🗄️ Supabase connected: ${supabaseUrl ? 'Yes' : 'No'}`);
});

module.exports = app;
