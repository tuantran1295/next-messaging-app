'use client'
import {useEffect} from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const NotificationContext = ({ children }) => {
  useEffect(() => {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: '0e7852ec-1047-4243-9943-c4c24a1b1fef',
    });

    beamsClient.start()
        .then(() => beamsClient.addDeviceInterest('hello'))
        .then(() => {console.log('Successfully registered and subscribed!')})
        .catch(console.error);
  }, [])

  return (
      <>
        {children}
      </>
  )
}
