export async function POST(request: Request) {
  const { email, password } = await request.json();
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${backendUrl}/User/signin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { accept: "text/plain" },
  });

  const data = await res.text();
  // Pass through the backend's status and body
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
} 