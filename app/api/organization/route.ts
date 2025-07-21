export async function GET(request: Request) {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeader = request.headers.get("authorization");
  const url = `${backendUrl}/Organisation`;

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

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  const authHeader = request.headers.get("authorization");
  const url = `${backendUrl}/Organisation`;
  const body = await request.text();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body,
  });

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
} 