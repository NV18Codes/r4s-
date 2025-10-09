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
    return NextResponse.json(
      { meta: { status: 'Error', messages: [{ text: 'Internal server error', type: 'Error' }] } },
      { status: 500 }
    );
  }
}