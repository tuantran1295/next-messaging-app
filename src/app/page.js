'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
// Firebase deps
import firebase_app from '../firebase/config';
import { getAuth } from "firebase/auth";
import logout from "@/firebase/auth/signout";
import { signInWithGoogle } from "@/firebase/auth/signin";
// Components
import { GoogleButton, Channel, Loader } from '../components';
// Icons
import { Burn, MoonIcon, SunIcon } from '../components';
// Theme
import { useTheme } from 'next-themes';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signin";
import {toast} from "react-toastify";
import LoginForm from "@/components/LoginForm";

const auth = getAuth(firebase_app);

export default function Home() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    const switchTheme = () => {
        if (mounted) {
            setTheme(theme === 'light' ? 'dark' : 'light');
        }
    };

    const brandLogo =
        mounted && theme === 'dark'
            ? '/assets/Gray_logo.svg'
            : '/assets/KaiOS_logo.svg';

    const ThemeIcon = mounted && theme === 'dark' ? SunIcon : MoonIcon;

    const loginWithGoogle = async () => {
        const { result, error } = await signInWithGoogle();
        if (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        // else successful
        console.log(result);
    };

    const signOut = async () => {
        const {error} = logout();
        if (error) {
            console.error(error);
        }
    };

    const renderContent = () => {

        if (user) return <Channel user={user} />;

        return (
            <div className='flex items-center justify-center shadow-md h-full'>
                <div className='flex flex-col items-center justify-center max-w-xl w-full mx-4 p-8 rounded-md shadow-card bg-white dark:bg-coolDark-600 transition-all'>
                    <h2 className='mb-2 text-3xl flex items-center'>
                        <Burn />
                        Dreamer FireChat
                    </h2>
                    <p className='mb-6 text-lg text-center text-gray-500'>
                        The easiest way to chat with people all around the world.
                    </p>
                    <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="bg-white py-4 px-4">
                            <LoginForm/>
                        </div>
                    </div>
                    <GoogleButton onClick={loginWithGoogle}>
                        Sign in with Google
                    </GoogleButton>
                </div>
            </div>
        );
    };

    return (
        <div className='flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors'>
            <Head>
                <title>Dreamer FireChat</title>
            </Head>
            <header
                className={`flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md ${styles.header_space}`}
            >
                <a href=''>
                    <img src={brandLogo} alt='Dreamer_logo' width={150} />
                </a>
                <div className='flex items-center'>
                    {user ? (
                        <button
                            onClick={signOut}
                            className='uppercase text-sm font-medium text-KaiBrand-500 hover:text-white tracking-wide hover:bg-KaiBrand-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-KaiBrand-500 focus:ring-opacity-75 transition-all'
                        >
                            Sign out
                        </button>
                    ) : null}
                    <ThemeIcon className='h-8 w-8 cursor-pointer' onClick={switchTheme} />
                </div>
            </header>
            <main className={`flex-1 ${styles.main_space}`}>{renderContent()}</main>
        </div>
    )
}