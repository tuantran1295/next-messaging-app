'use client'
import React, {useState, useEffect} from 'react';
import Pusher from 'pusher-js';
import {toast} from "react-toastify";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL_NAME);

        channel.bind(process.env.NEXT_PUBLIC_PUSHER_EVENT, data => {
            setNotifications([...notifications, data]);
            console.log([...notifications, data]);
            toast.info(JSON.stringify(data), {
                position: toast.POSITION.TOP_RIGHT
            });
            // showBrowserNotification('Notification', JSON.stringify(data));
        });

        return () => {
            pusher.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL_NAME);
        };
    }, [notifications]);

    const showBrowserNotification = (title = 'notification', body = 'placeholder') => {
        if (!window.Notification) {
            console.log('Browser does not support notifications.');
        } else {
            // check if permission is already granted
            if (Notification.permission === 'granted') {
                // show notification here
                var notify = new Notification(title, {
                    body: body,
                    icon: 'https://bit.ly/2DYqRrh',
                });
            } else {
                // request permission from user
                Notification.requestPermission().then(function (p) {
                    if (p === 'granted') {
                        // show notification here
                        var notify = new Notification(title, {
                            body: body,
                            icon: 'https://bit.ly/2DYqRrh',
                        });
                    } else {
                        console.log('User blocked notifications.');
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            }
        }

    }

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;