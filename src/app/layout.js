'use client'
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "@/context/AuthContext";
import { NextThemeProvider } from "@/context/ThemeContext"
import ToastProvider from "@/context/ToastProvider";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
          <link rel='icon' href='/chat.svg' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='viewport' content='viewport-fit=cover'></meta>
      </head>
        <body>
          <AuthContextProvider>
              <NextThemeProvider>
                  <ToastProvider>
                      {children}
                  </ToastProvider>
              </NextThemeProvider>
          </AuthContextProvider>
        </body>
      </html>
  )
}