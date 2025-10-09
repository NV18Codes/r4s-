import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    console.log("=== DELETE SPACE TYPE ===");
    console.log("Space Type ID:", id);
    console.log("Backend URL:", backendUrl);

    if (!authHeader) {
      return NextResponse.json(
        { meta: { status: 'Error', messages: [{ text: 'Authorization header missing', type: 'Error' }] } },
        { status: 401 }
      );
    }

    const res = await fetch(`${backendUrl}/api/v1/SpaceType/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    const data = await res.json();
    console.log("Delete space type response:", data);

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Delete SpaceType API error:', error);
    return NextResponse.json(
      { meta: { status: 'Error', messages: [{ text: 'Internal server error', type: 'Error' }] } },
      { status: 500 }
    );
  }
}
