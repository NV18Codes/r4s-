export async function GET(request, { params }) {
  try {
    const { organizationId } = params;
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${backendUrl}/api/v1/Organization/${organizationId}/users`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
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
        data: { message: "An error occurred while fetching organization users" },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
