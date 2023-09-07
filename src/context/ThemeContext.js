'use client'
import { ThemeProvider } from 'next-themes'
export const NextThemeProvider = ({ children }) => {
    return <ThemeProvider attribute='class'>
                {children}
           </ThemeProvider>
}
