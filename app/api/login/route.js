import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log("=== LOGIN API ===");
    console.log("Email:", email);
    console.log("Password provided:", !!password);

    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      console.error("Backend URL not configured");
      return NextResponse.json(
        { meta: { status: 'Error', messages: [{ text: 'Backend not configured', type: 'Error' }] } },
        { status: 500 }
      );
    }

    const res = await fetch(`${backendUrl}/api/v1/User/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.error("Backend API error:", res.status, res.statusText);
      const errorText = await res.text();
      console.error("Error response:", errorText);
      
      return NextResponse.json(
        { 
          meta: { 
            status: 'Error', 
            messages: [{ 
              text: `Backend error: ${res.status} ${res.statusText}`, 
              type: 'Error' 
            }] 
          } 
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("Login response:", data);

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Login API error:', error);
    
    // Check if it's a network error (backend not available)
    if (error.message.includes('fetch') || error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
      return NextResponse.json(
        { 
          meta: { 
            status: 'Error', 
            messages: [{ 
              text: 'Backend service is currently unavailable. Please try again later.', 
              type: 'Error' 
            }] 
          } 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        meta: { 
          status: 'Error', 
          messages: [{ 
            text: `Internal server error: ${error.message}`, 
            type: 'Error' 
          }] 
        } 
      },
      { status: 500 }
    );
  }
}