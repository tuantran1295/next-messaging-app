'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
// Firebase deps
import firebase_app from '../firebase/config';
import { getAuth } from "firebase/auth";
import { signInWithGoogle } from "@/firebase/auth/signin";
// Components
import { GoogleButton, Channel, Loader } from '../components';
// Icons
import { Burn, MoonIcon, SunIcon } from '../components';

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";
import LoginForm from "@/components/LoginForm";
import NavBar from "@/components/NavBar";
import Notifications from "@/components/Notifications";

const auth = getAuth(firebase_app);

export default function Home() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

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

    const renderContent = () => {

        if (user) return (
            <>
                <Channel user={user} />
                <Notifications/>
            </>
        );

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
                    <div className="mb-6 sm:mx-auto sm:w-full sm:max-w-sm">
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
            <NavBar user={user}/>
            <main className={`flex-1 ${styles.main_space}`}>{renderContent()}</main>
        </div>
    )
}