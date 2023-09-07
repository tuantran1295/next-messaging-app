import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";
import {useRouter} from "next/navigation";

const auth = getAuth(firebase_app);

export default async function logout() {
    let result = null,
        error = null;

        result = await signOut(auth).then(function () {

        }).catch(e =>  {
            error = e;
        });


    return { result, error };
}