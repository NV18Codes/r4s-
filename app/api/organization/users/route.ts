export async function GET(request: Request) {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeader = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const orgId = searchParams.get("orgId");
  if (!orgId) {
    return new Response(JSON.stringify({ error: "Missing orgId" }), { status: 400 });
  }
  const url = `${backendUrl}/Organisation/${orgId}/users`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "text/plain",
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
  });

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
} 