import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import SuccessNotification from '../../recepcomponents/SnackBar/SuccessNotification';

const NotificationComponentlk = () => {
    const [connection, setConnection] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [notifications2, setNotifications2] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notiMessage, setNotiMessage] = useState("");
    const [typenoti, settypenoti] = useState("success");
  
    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7205/notificationHub", {})
            .withAutomaticReconnect()
            .build();
                
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.invoke("GetConnectionId")
                    .then(id => {
                        console.log('Connection ID:', id);
                        setNotiMessage(" Connected!");
                        settypenoti("success");
                        setNotificationOpen(true);
                        // setTimeout(() => setNotificationOpen(false), 3000); // Close notification after 3 seconds
                    });
                    
                    console.log('Connected!');
                    connection.on('ReceiveNotification', message => {
                        console.log('Received notification:', message);
                        setNotiMessage(message);
                        settypenoti("success");
                        setNotifications(notifications => [...notifications, message]);
                        setNotificationOpen(true); // Open notification when new message arrives
                        // setTimeout(() => setNotificationOpen(false), 3000); // Close notification after 3 seconds
                    });
                    connection.on('Receiver', message => {
                        console.log('Received notification:', message);
                        setNotiMessage(message);
                        settypenoti("success");
                        setNotifications2(notifications2 => [...notifications2, message]);
                        setNotificationOpen(true); // Open notification when new message arrives
                        // setTimeout(() => setNotificationOpen(false), 3000); // Close notification after 3 seconds
                    })
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    return (
        <div>
            <h2>Notifications from ReceiveNotification</h2>
            {/* <h3>{profile.Name}</h3> */}
            <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen} type={typenoti}></SuccessNotification>            
        <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
            <h2>receiver</h2>
            <ul>
                {notifications2.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
                </ul>

        </div>
    );
}

export default NotificationComponentlk;