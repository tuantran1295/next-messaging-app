'use client'
import { Slide, ToastContainer } from 'react-toastify';


export default function ToastProvider({ children }) {
    return (
        <>
            {children}
            <ToastContainer transition={Slide} />
        </>
    );
}