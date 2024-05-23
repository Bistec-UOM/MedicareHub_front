import React, { useEffect } from 'react';
import { sendNotificationToUser, startConnection } from './signalrService';

const NotificationComponent = () => {
    useEffect(() => {
        startConnection();
    }, []);

    const notifyUser = async () => {
        const userId = "66"; // Replace with actual user ID
        const message = "Hello, this is a notification!";
        await sendNotificationToUser(userId, message);
        console.log("noti send");
    };

    return (
        <div>
            <button onClick={notifyUser}>Send Notification</button>
        </div>
    );
};

export default NotificationComponent;
