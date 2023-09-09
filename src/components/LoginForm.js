import React from "react";
import {useRouter} from "next/navigation";
import signIn from "@/firebase/auth/signin";
import { toast } from 'react-toastify';

function LoginForm() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            console.log(error);
            toast.error(JSON.stringify(error), {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
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

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900 dark:text-white"
                    >
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a
                        href="/signup"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Create new account
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
            </div>
        </form>
    )
}

export default LoginForm;