import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInWithGoogle() {
    let result = null,
        error = null;
    const provider = new GoogleAuthProvider();
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
        console.error(e.message);
    }

    return { result, error };
}