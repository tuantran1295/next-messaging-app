'use client'
import './globals.css';
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <head />
        <body>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </body>
      </html>
  )
}