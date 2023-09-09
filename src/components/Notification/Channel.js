import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
// Firebase deps
import firebase_app from "../../firebase/config";
// Components
import {Message} from '../index';
import {getFirestore, collection, query, orderBy, limit, onSnapshot, serverTimestamp, addDoc} from "firebase/firestore";
import MentionChatInput from "@/components/mention/MentionChatInput";

function Channel({user = null}) {
    const db = getFirestore(firebase_app);
    const messagesRef = collection(db, 'messages');
    const dbQuery = query(messagesRef, orderBy('createdAt'), limit(100));

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const inputRef = useRef(null);
    const bottomListRef = useRef(null);

    const {uid, displayName, photoURL} = user;

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
            // Add new message in Firestore
            addDoc(messagesRef, {
                text: trimmedMessage,
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
    };

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
                    {/*<input*/}
                    {/*  ref={inputRef}*/}
                    {/*  type='text'*/}
                    {/*  value={newMessage}*/}
                    {/*  onChange={handleOnChange}*/}
                    {/*  placeholder='Type your message here...'*/}
                    {/*  className='flex-1 bg-transparent outline-none'*/}
                    {/*/>*/}
                    <MentionChatInput
                        value={newMessage}
                        onChange={handleOnChange}
                    />
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
