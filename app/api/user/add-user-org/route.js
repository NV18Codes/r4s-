export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${backendUrl}/api/v1/User/add-user-org`;

    console.log("=== API ROUTE: ADD USER ORG ===");
    console.log("Request body:", body);
    console.log("Role name:", body.roleName);
    console.log("Role type:", typeof body.roleName);
    console.log("Backend URL:", url);

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
    console.log("=== BACKEND RESPONSE ===");
    console.log("Response data:", data);
    console.log("Response status:", res.status);
    console.log("Response OK?:", res.ok);
    console.log("Meta:", data?.meta);
    console.log("Error details:", data?.meta?.messages);
    
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Add user org API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}