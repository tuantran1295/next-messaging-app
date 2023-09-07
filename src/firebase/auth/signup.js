import firebase_app from "@/firebase/config";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email, password, displayName, imgURL) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password).then(credential => {
            console.log(credential);
            if (displayName || imgURL) {
                updateProfile(credential.user, {
                    displayName: displayName ? displayName : null,
                    photoURL: imgURL ? imgURL : null
                }).catch(e => {
                    error = e
                });
            }
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}