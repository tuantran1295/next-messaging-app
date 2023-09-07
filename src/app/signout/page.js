'use client'
import React, {useEffect} from "react";
import { useRouter } from 'next/navigation'
import {useAuthContext} from "@/context/AuthContext";
import logout from "@/firebase/auth/signout";

function Page() {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect( () => {
        const {result, error} = logout();

        if (error) {
            console.log(error);
        }

        console.log(result);
        if (user === null) router.push("/");
    }, [user])

    return (
        <div>Signing out...</div>
    )
}

export default Page;