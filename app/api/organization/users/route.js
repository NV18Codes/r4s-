import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!authHeader) {
      return NextResponse.json(
        { meta: { status: 'Error', messages: [{ text: 'Authorization header missing', type: 'Error' }] } },
        { status: 401 }
      );
    }

    const res = await fetch(`${backendUrl}/api/v1/Organization/users`, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Organization users API error:', error);
    return NextResponse.json(
      { meta: { status: 'Error', messages: [{ text: 'Internal server error', type: 'Error' }] } },
      { status: 500 }
    );
  }
}