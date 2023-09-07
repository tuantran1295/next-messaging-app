'use client'
import './globals.css';
import { AuthContextProvider } from "@/context/AuthContext";
import { NextThemeProvider } from "@/context/ThemeContext"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                  {children}
              </NextThemeProvider>
          </AuthContextProvider>
          <ToastContainer/>
        </body>
      </html>
  )
}