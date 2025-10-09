// API Configuration for Production
const getBackendUrl = () => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Use public environment variable for client-side
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-backend-api.com';
  }
  
  // Use server-side environment variable
  return process.env.BACKEND_URL || 'https://your-backend-api.com';
};

const getApiHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const handleApiError = (error, response = null) => {
  console.error('API Error:', error);
  
  if (response) {
    console.error('Response Status:', response.status);
    console.error('Response Data:', response);
  }
  
  // Return a standardized error format
  return {
    success: false,
    error: error.message || 'An unexpected error occurred',
    status: response?.status || 500
  };
};

const makeApiRequest = async (endpoint, options = {}) => {
  const baseUrl = getBackendUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const config = {
    headers: getApiHeaders(options.token),
    ...options
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data?.meta?.messages?.[0]?.text || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return {
      success: true,
      data: data.data,
      meta: data.meta,
      response
    };
  } catch (error) {
    return handleApiError(error, options.response);
  }
};

export {
  getBackendUrl,
  getApiHeaders,
  handleApiError,
  makeApiRequest
};
