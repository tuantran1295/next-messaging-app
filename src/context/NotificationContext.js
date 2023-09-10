'use client'
import {createContext, useContext, useEffect, useState} from "react";
import Pusher from "pusher";
export const NotificationContext = createContext({});
export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [pusher, setPusher] = useState(null);
    useEffect(() => {
      const pusherInstance = new Pusher({
      appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
      auth: {
        headers: {
          Authorization: 'Bearer ' + 'FCD1E95A58F6B7731309F6BEADD0E365466892F6716363B677CDE74D68C74F2D',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": '*',
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers": "X-Requested-With,Content-Type,X-Token-Auth,Authorization"
        }
      }
    });
      setPusher(pusherInstance);
  }, [])

  return (
      <NotificationContext.Provider value={{pusher}}>
        {children}
      </NotificationContext.Provider>
  )
}
