import React, {createContext, useContext, useEffect, useState} from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { Loader } from "@/components";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children
}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);

            return () => unsubscribe();
        });
    }, []);

    const loadingIndicator = () => <div className='flex items-center justify-center h-full'>
        <Loader />
    </div>

    return (
        <AuthContext.Provider value={{user}}>
            {loading ? <div>{loadingIndicator()}</div> : children}
        </AuthContext.Provider>
    )
}
