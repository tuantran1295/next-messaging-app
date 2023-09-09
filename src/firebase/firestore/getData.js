import firebase_app from "@/firebase/config";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";

const db = getFirestore(firebase_app);
export async function getDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getAllUser() {
    let error = null;
    let result = null;
    let messageList = []
    try {
        const snapshot = await getDocs(collection(db, 'messages'));
        messageList = snapshot.docs.map(doc => doc.data());
        for (let i = 0; i < messageList.length; i++) {
            delete messageList[i].text;
            delete messageList[i].createdAt;
            if (messageList[i].photoURL === null) {
                messageList[i].photoURL = '/assets/avatar-placeholder.jpg';
            }
            if (messageList[i].displayName === null) {
                messageList[i].displayName = 'Anonymous';
            }
            messageList[i].id = i;
            messageList[i].display = messageList[i].displayName;
        }
        result = removeDuplicate(messageList);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

function removeDuplicate(array) {
    return array.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === array.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });
}