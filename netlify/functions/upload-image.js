// Netlify serverless function for image upload and crack detection
// Simple in-memory storage (in production, use a database like Upstash Redis)
const imageStore = new Map();

// Generate unique ID
function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Generate random crack detection results (stub implementation)
function detectCracks() {
  const crackCount = Math.floor(Math.random() * 10);
  const boxes = [];
  
  for (let i = 0; i < crackCount; i++) {
    boxes.push({
      x1: Math.random() * 500,
      y1: Math.random() * 500,
      x2: Math.random() * 500 + 100,
      y2: Math.random() * 500 + 100,
      confidence: 0.5 + Math.random() * 0.5,
      class: 'crack',
    });
  }
  
  return {
    boxes,
    crackCount,
    confidence: boxes.length > 0 ? boxes.reduce((sum, b) => sum + b.confidence, 0) / boxes.length : 0,
  };
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Handle GET request for fetching image status
  if (event.httpMethod === 'GET') {
    const imageId = event.path.split('/').pop();
    const image = imageStore.get(imageId);
    
    if (!image) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Image not found' }),
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(image),
    };
  }

  // Handle POST request for image upload
  if (event.httpMethod === 'POST') {
    try {
      // For simplicity, accept JSON with base64 encoded image
      const body = JSON.parse(event.body);
      const base64Data = body.image;
      const filename = body.filename || 'upload.jpg';

      if (!base64Data) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'No image provided' }),
        };
      }

      // Generate unique ID for the image
      const imageId = generateId();

      // Process the image with crack detection
      const detectionResult = detectCracks();
      
      // Create image record
      const imageRecord = {
        id: imageId,
        filename: filename,
        status: 'completed',
        crackCount: detectionResult.crackCount,
        confidence: detectionResult.confidence,
        boxes: detectionResult.boxes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store the image
      imageStore.set(imageId, imageRecord);

      // Simulate creating work order if cracks found
      if (detectionResult.crackCount > 0) {
        console.log(`Work order created for image ${imageId} with ${detectionResult.crackCount} cracks`);
      }

      // Return success response
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: imageId,
          filename: filename,
          status: 'completed',
          crackCount: detectionResult.crackCount,
          confidence: detectionResult.confidence,
          message: 'Image uploaded and analyzed successfully',
        }),
      };

    } catch (error) {
      console.error('Error processing image:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to process image', details: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};