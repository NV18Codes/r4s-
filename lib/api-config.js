// API Configuration for Production and Development
const getBackendUrl = () => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Use public environment variable for client-side
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    // If no environment variable is set, use localhost for development
    if (!backendUrl) {
      console.warn('NEXT_PUBLIC_BACKEND_URL not set, using localhost:3001');
      return 'http://localhost:3001';
    }
    
    // If it's still the placeholder URL, warn and use localhost
    if (backendUrl.includes('your-backend-url.com')) {
      console.warn('Backend URL is still placeholder, using localhost:3001. Please set NEXT_PUBLIC_BACKEND_URL to your actual backend URL.');
      return 'http://localhost:3001';
    }
    
    return backendUrl;
  }
  
  // Use server-side environment variable
  return process.env.BACKEND_URL || 'http://localhost:3001';
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

// Simple helper to get full API URL
const getApiUrl = (endpoint) => {
  const baseUrl = getBackendUrl();
  // Handle both /api/... and api/... formats
  let normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // If endpoint starts with /api/ (not /api/v1/), convert to /api/v1/
  // This matches the backend's API versioning scheme
  if (normalizedEndpoint.startsWith('/api/') && !normalizedEndpoint.startsWith('/api/v1/')) {
    normalizedEndpoint = normalizedEndpoint.replace('/api/', '/api/v1/');
  }
  
  return `${baseUrl}${normalizedEndpoint}`;
};

export {
  getBackendUrl,
  getApiHeaders,
  handleApiError,
  makeApiRequest,
  getApiUrl
};
