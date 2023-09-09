import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
// Firebase deps
import firebase_app from "../../firebase/config";
// Components
import {Message} from '../index';
import {getFirestore, collection, query, orderBy, limit, onSnapshot, serverTimestamp, addDoc} from "firebase/firestore";
import MentionChatInput from "@/components/mention/MentionChatInput";
import {useNotificationContext} from "@/context/NotificationContext";

function Channel({user = null}) {
    const db = getFirestore(firebase_app);
    const messagesRef = collection(db, 'messages');
    const notificationRef = collection(db, 'notification');
    const mentionedList = useRef([]);
    const dbQuery = query(messagesRef, orderBy('createdAt'), limit(100));

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const inputRef = useRef(null);
    const bottomListRef = useRef(null);

    const {uid, displayName, photoURL} = user;

    const {pusher} = useNotificationContext();

    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            // Update state
            setMessages(data);
        });

        // Detach listener
        return unsubscribe;
    }, []);

    const handleOnChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const trimmedMessage = newMessage.trim();
        if (db) {
            addMessageToDB(trimmedMessage);
            if (mentionedList.current.length > 0) {
                addNotificationToDB();
                triggerNotification();
            }
        }
    };

    const addMessageToDB = (message) => {
        // Add new message in Firestore
        addDoc(messagesRef, {
            text: message,
            createdAt: serverTimestamp(),
            uid,
            displayName,
            photoURL,
        }).then(r => {
            // console.log(r);
            // Clear input field
            setNewMessage('');
            // Scroll down to the bottom of the list
            bottomListRef.current?.scrollIntoView({behavior: 'smooth'});
        });
    }

    const addNotificationToDB = () => {
        addDoc(notificationRef, {
            text: `${displayName} has mentioned you in a message.`,
            createdAt: serverTimestamp(),
            sender: {id: user.uid, name: user.displayName, imgURL: user.photoURL},
            receiver: mentionedList.current,
            isRead: false,
            isClicked: false
        }).then(r => {
            mentionedList.current = []
        });
    }

    const onUserMentioned = (addedUser) => {
        mentionedList.current.push(addedUser);
    }

    const onMentionedRemove = (removedUser) => {

    }

    const triggerNotification = () => {
        pusher.trigger("chat-channel", "mentioned", {
            message: `${user.displayName} has mentioned you in a message.`,
            sender: {id: user.uid, name: user.displayName, imgURL: user.photoURL},
            receiver: mentionedList.current,
            isClicked: false,
            isRead: false,
            createdAt: new Date(),
        });
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='overflow-auto h-full'>
                <div className='py-4 max-w-screen-lg mx-auto'>
                    <div className='border-b dark:border-gray-600 border-gray-200 py-8 mb-4'>
                        <div className='font-bold text-3xl text-center'>
                            <p className='mb-1'>Welcome to</p>
                            <p className='mb-3'>Dreamer FireChat</p>
                        </div>
                        <p className='text-gray-400 text-center'>
                            This is the beginning of this chat.
                        </p>
                    </div>
                    <ul>
                        {messages.map((message) => (
                            <li key={message.id}>
                                <Message {...message} />
                            </li>
                        ))}
                    </ul>
                    <div ref={bottomListRef}/>
                </div>
            </div>
            <div className='mb-6 mx-4'>
                <form
                    onSubmit={handleOnSubmit}
                    className='flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md'
                >
                    <MentionChatInput
                        value={newMessage}
                        onChange={handleOnChange}
                        onUserMentioned={onUserMentioned}
                        onMentionRemove={onMentionedRemove}
                    />
                    {/*<input*/}
                    {/*  ref={inputRef}*/}
                    {/*  type='text'*/}
                    {/*  value={newMessage}*/}
                    {/*  onChange={handleOnChange}*/}
                    {/*  placeholder='Type your message here...'*/}
                    {/*  className='flex-1 bg-transparent outline-none'*/}
                    {/*/>*/}
                    <button
                        type='submit'
                        disabled={!newMessage}
                        className='pl-4 uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors'
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

Channel.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string,
        displayName: PropTypes.string,
        photoURL: PropTypes.string,
    }),
};

export default Channel;
