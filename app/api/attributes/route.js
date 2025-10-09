import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    console.log("=== ATTRIBUTES API ===");
    console.log("Backend URL:", backendUrl);
    console.log("Auth header present:", !!authHeader);
    console.log("Environment variables:", {
      BACKEND_URL: process.env.BACKEND_URL,
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
    });

    if (!authHeader) {
      console.log("No authorization header");
      return NextResponse.json(
        { meta: { status: 'Error', messages: [{ text: 'Authorization header missing', type: 'Error' }] } },
        { status: 401 }
      );
    }

    const url = `${backendUrl}/api/v1/Attributes`;
    console.log("Fetching from:", url);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    const data = await res.json();
    console.log("Response data:", data);

    // If backend returns empty object or error, return empty array
    if (!data || Object.keys(data).length === 0) {
      console.log("Backend returned empty response, returning empty array");
      return NextResponse.json({
        meta: { status: 'Success', messages: [{ text: 'No attributes found', type: 'Info' }] },
        data: []
      });
    }

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Attributes API error:', error);
    
    // If it's a network error (backend not running), return empty array instead of error
    if (error.message.includes('fetch') || error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
      console.log("Backend appears to be down, returning empty array");
      return NextResponse.json({
        meta: { status: 'Success', messages: [{ text: 'Backend not available, showing empty list', type: 'Info' }] },
        data: []
      });
    }
    
    return NextResponse.json(
      { 
        meta: { 
          status: 'Error', 
          messages: [{ text: `Internal server error: ${error.message}`, type: 'Error' }] 
        },
        data: []
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    const body = await request.json();

    if (!authHeader) {
      return NextResponse.json(
        { meta: { status: 'Error', messages: [{ text: 'Authorization header missing', type: 'Error' }] } },
        { status: 401 }
      );
    }

    const res = await fetch(`${backendUrl}/api/v1/Attributes`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Attributes API error:', error);
    return NextResponse.json(
      { meta: { status: 'Error', messages: [{ text: 'Internal server error', type: 'Error' }] } },
      { status: 500 }
    );
  }
}
