export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${backendUrl}/api/v1/Role/create-global-role`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        meta: {
          status: "Error",
          messages: [{ level: "Error", text: error.message }],
        },
        data: { message: "An error occurred while creating global role" },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
