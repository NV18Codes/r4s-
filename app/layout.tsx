// app/layout.tsx
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
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
              className: 'toast-custom',
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}