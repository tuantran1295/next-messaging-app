importScripts("https://js.pusher.com/beams/service-worker.js");
importScripts("https://js.pusher.com/beams/1.0/push-notifications-cdn.js");

PusherPushNotifications.onNotificationReceived = ({ pushEvent, payload }) => {
    alert(payload);
    pushEvent.waitUntil(
        self.registration.showNotification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon,
            data: payload.data,
        })
    );
};