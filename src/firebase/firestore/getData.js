import firebase_app from "@/firebase/config";
import {collection, doc, getDoc, getDocs, getFirestore, query, orderBy} from "firebase/firestore";

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
            messageList[i].id = messageList[i].uid;
            messageList[i].display = messageList[i].displayName;
        }
        result = removeDuplicate(messageList);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

function removeDuplicate(array) {
    const nonDuplicate = []
    for (let i = 0; i <array.length; i++) {
        const isExist = nonDuplicate.filter(u => u.uid === array[i].uid)[0];
        if (!isExist) {
            nonDuplicate.push(array[i])
        }
    }
    return nonDuplicate;
}

export async function getCurrentUserNotification(currentUser) {
    let error = null;
    let notiList = [];
    let received = [];
    let sentByMe = []
    try {
        const notificationRef = collection(db, 'notification');
        const snapshot = await getDocs(query(notificationRef, orderBy('createdAt', 'desc')));
        notiList = snapshot.docs.map(doc => {return {...doc.data(), id: doc.id}});
    }catch (e) {
        error = e
    }

    for (let i = 0; i < notiList.length; i++) {
        const receivers = notiList[i].receiver;
        if (receivers && receivers.length > 0)
        for (let j = 0; j < receivers.length; j++) {
            if (currentUser.uid === receivers[j].uid) {
                received.push(notiList[i]);
            }
        }

        const sender = notiList[i].sender;
        if (sender.id === currentUser.uid) {
            sentByMe.push(notiList[i]);
        }
    }
    return { received, sentByMe, error }
}