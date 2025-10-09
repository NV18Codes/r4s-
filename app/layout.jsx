// app/layout.jsx
"use client"
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛣️</text></svg>" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <AuthProvider>
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#005580',
                color: 'white',
                border: 'none',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
