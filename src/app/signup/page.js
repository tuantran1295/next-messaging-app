'use client'
import React, {useState} from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";
import NavBar from "@/components/NavBar";

function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [imgURL, setImgURL] = useState('');

    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password, displayName, imgURL);

        if (error) {
            console.log(error);
            toast.error(JSON.stringify(error), {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        console.log(result);
        return router.push("/");
    }

    return (
        <>
            <NavBar/>
            <div className="h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign Up
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleForm} className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="display-name"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Display name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="display-name"
                                        name="display-name"
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="avatar"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Avatar
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="avatar"
                                        name="avatar"
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) => setImgURL(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;