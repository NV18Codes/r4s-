export async function GET(request, { params }) {
  try {
    const { organizationId } = params;
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${backendUrl}/api/v1/Space/${organizationId}`;

    console.log("=== SPACE BY ORGID API ===");
    console.log("Organization ID from params:", organizationId);
    console.log("Backend URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    const data = await res.json();
    
    console.log("=== SPACE BY ORGID RESPONSE ===");
    console.log("Response:", data);
    console.log("Status:", res.status);
    console.log("Meta status:", data?.meta?.status);
    console.log("Data type:", Array.isArray(data?.data) ? "Array" : typeof data?.data);
    console.log("Data length:", Array.isArray(data?.data) ? data.data.length : "N/A");
    if (Array.isArray(data?.data) && data.data.length > 0) {
      console.log("First space:", data.data[0]);
    }
    
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Space by orgId API error:", error);
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
