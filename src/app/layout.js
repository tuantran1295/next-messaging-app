'use client'
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "@/context/AuthContext";
import { NextThemeProvider } from "@/context/ThemeContext"
import ToastProvider from "@/context/ToastProvider";
import {NotificationContext} from "@/context/NotificationContext";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
          <link rel='icon' href='/chat.svg' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='viewport' content='viewport-fit=cover'></meta>
          <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
      </head>
        <body>
          <AuthContextProvider>
              <NextThemeProvider>
                  <NotificationContext>
                      <ToastProvider>
                          {children}
                      </ToastProvider>
                  </NotificationContext>
              </NextThemeProvider>
          </AuthContextProvider>
        </body>
      </html>
  )
}