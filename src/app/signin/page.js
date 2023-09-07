'use client'
import React from "react";
import LoginForm from "@/components/LoginForm";

function Page() {
    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login with your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <a
                            href="/signup"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            create a new one
                        </a>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;