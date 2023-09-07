'use client'
import React, {useEffect} from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
function Page() {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user === null) router.push("/");
    },[user])

    return (
        <>
            <NavBar user={user}/>
            <h1>Admin CMS</h1>
            <div>Only logged in users can view this page</div>
        </>
    );
}

export default Page;