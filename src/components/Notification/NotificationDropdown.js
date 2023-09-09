'use client'
import React, {useState, useEffect, useRef} from 'react';
import Pusher from 'pusher-js';
import {toast} from "react-toastify";
import {getCurrentUserNotification} from "@/firebase/firestore/getData";
import {useAuthContext} from "@/context/AuthContext";
import moment from "moment";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

function NotificationDropdown({}) {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const currentUserNotiList = useRef([]);
    const { user } = useAuthContext();

    useEffect(() => {
        getCurrentUserNotiList();
    }, [])

    useEffect(() => {
        const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL_NAME);

        channel.bind(process.env.NEXT_PUBLIC_PUSHER_EVENT, data => {
            setNotifications([...notifications, data]);

            filterOwnerNotification(data);
        });

        return () => {
            pusher.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL_NAME);
        };
    }, [notifications]);

    const getCurrentUserNotiList = async () => {
        const {result, error} = await getCurrentUserNotification(user);
        if (error) {
            console.log(error);
            toast.error(JSON.stringify(error), {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        // else successful
        console.log(result);
        const fixedList = fixCreatedAtTimeStampFormat(result);
        debugger;
        if (result && result.length > 0) {
            setNotifications(fixedList);
        }
    }

    const fixCreatedAtTimeStampFormat = (result) => {
        const notiList = [...result];
        for (let i = 0; i < result.length; i++) {
            const createdAt = result[i].createdAt;
            if (typeof createdAt === 'object') { // firebase timestamp format
                notiList[i].createdAt =  new Date(createdAt.seconds * 1000 + createdAt.nanoseconds/1000000)
            }
        }
        return notiList;
    }

    const filterOwnerNotification = (data) => {
        console.log(data);
        const receivers = data.receiver;
        for (let i = 0; i < receivers.length; i++) {
            if (user.uid === receivers[i].uid) {
                setNotifications([...notifications, data]);
                displayNotificationToast(data.message);
            }
        }
    }

    const displayNotificationToast = (message) => {
        toast.info(JSON.stringify(message), {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const toggleShowDropdown = () => {
        setShowDropdown((prevState) => {
            return !prevState;
        })
    }
    return (<>
            {/*Notifications*/}
            <button type="button" onClick={toggleShowDropdown} data-dropdown-toggle="notification-dropdown"
                    className="p-2 mr-4 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <span className="sr-only">View notifications</span>
                {/*Bell icon */}
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 14 20">
                    <path
                        d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
                </svg>
            </button>
            <div
                className={`${notifications.length ? '' : 'hidden'} flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700`}>
                <svg className="w-2 h-2 text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 18 18">
                    <path
                        d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/>
                    <path
                        d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                </svg>
            </div>
            {/*Dropdown menu */}
            <div
                className={`${showDropdown ? '' : "hidden"} right-6 absolute top-9 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700`}
                id="notification-dropdown">
                <div
                    className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    Notifications
                </div>
                <div>
                    {notifications.map((notification, index) => (
                        <div
                            className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                            <div className="flex-shrink-0">
                                <img className="w-11 h-11 rounded-full"
                                     src={notification.sender.imgURL ? notification.sender.imgURL : '/assets/avatar-placeholder.jpg'}
                                     alt="sender avatar"/>

                            </div>
                            <div className="pl-3 w-full">
                                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                <span
                                    className="font-semibold text-gray-900 dark:text-white">{notification.sender.name + " "}</span>
                                     has mentioned you in a message.
                                </div>
                                <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                    {moment(notification.createdAt).format('hh:mm DD/MM/YYYY')}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div
                        className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline">
                        <div className="inline-flex items-center ">
                            <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                <path fillRule="evenodd"
                                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                      clipRule="evenodd"></path>
                            </svg>
                            View all
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationDropdown;