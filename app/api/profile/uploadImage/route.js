export async function POST(request) {
  try {
    const formData = await request.formData();
    const authHeader = request.headers.get('authorization');
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    
    // Get userId from FormData
    const userId = formData.get('userId');
    
    // Try adding userId as query parameter as well
    const url = userId 
      ? `${backendUrl}/api/v1/Profile/uploadImage?userId=${encodeURIComponent(userId)}`
      : `${backendUrl}/api/v1/Profile/uploadImage`;

    console.log("=== UPLOAD IMAGE API ===");
    console.log("Backend URL:", url);
    console.log("Has file:", formData.has('file'));
    console.log("Has userId:", formData.has('userId'));
    console.log("userId value:", userId);
    console.log("Authorization:", authHeader ? "Present" : "Missing");

    // Log all FormData entries
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      if (key === 'file') {
        console.log(`  ${key}:`, value.name, value.type, value.size, 'bytes');
      } else {
        console.log(`  ${key}:`, value);
      }
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
      body: formData,
    });

    const data = await res.json();
    
    console.log("=== UPLOAD IMAGE RESPONSE ===");
    console.log("Status:", res.status);
    console.log("Response:", data);
    console.log("Meta status:", data?.meta?.status);
    console.log("Image URL/Data:", data?.data);
    console.log("Error messages:", data?.meta?.messages);
    
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Profile uploadImage API error:", error);
    return new Response(
      JSON.stringify({ 
        meta: { 
          status: "Error", 
          messages: [{ text: "Internal server error", type: "Error" }] 
        },
        data: null 
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
