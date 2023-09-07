'use client'
import addData from "@/firebase/firestore/addData";
import firebase_app from "@/firebase/config";

export default function Home() {
    const handleForm = async () => {
        const data = {
            name: 'John Snow',
            house: 'Stark'
        }
        const { result, error } = await addData('users', 'user-id', data);

        if (error) {
            return console.log(error);
        }
    }
    return (
        <div>The quick brown fox jumps over lazy dogs</div>
    )
}