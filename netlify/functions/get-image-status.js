// Netlify serverless function to get image status
// Simple in-memory storage
const imageStore = new Map();

// This would normally come from a database
// For demo purposes, we'll pass data through the store from upload-image function

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
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
  } catch (error) {
    console.error('Error fetching image status:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch image status' }),
    };
  }
};
