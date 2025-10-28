// Netlify serverless function for work orders
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Return mock work orders for demonstration
  const mockWorkOrders = [
    {
      id: '1',
      imageId: 'img1',
      crackCount: 5,
      status: 'Open',
      priority: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      imageId: 'img2',
      crackCount: 3,
      status: 'Open',
      priority: 0,
      createdAt: new Date().toISOString(),
    },
  ];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(mockWorkOrders),
  };
};
