// app/layout.tsx
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

// Dummy function to get user info (replace with real auth logic)
function getUser() {
  return { name: "Saieesh", avatarUrl: "/avatar.png" };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = getUser(); // Replace with real logic

  return (
    <html lang="en">
      <head />
      <body className="min-h-screen flex flex-col bg-gray-50">
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
      </body>
    </html>
  );
}