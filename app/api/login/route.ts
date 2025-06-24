const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSb2Fkc0ludGVsU2VydmljZSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3NTAzMTU3MzEsImlzcyI6IlJvYWRzSW50ZWwiLCJhdWQiOiJDdXN0b21lciJ9.xUY42v0RZuFDoPmUCsjso5YsUnoxv2XzHTz7-u2MH70";

export async function POST(request: Request) {
  // Always succeed for demo
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${MOCK_TOKEN}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax; Secure`,
      "Content-Type": "application/json",
    },
  });
} 