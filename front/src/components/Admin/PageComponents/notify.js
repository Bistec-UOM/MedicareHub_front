import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const NotificationComponentlk = () => {
    const [connection, setConnection] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7205/notificationHub", {
                accessTokenFactory: () => localStorage.getItem('medicareHubToken')
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
                    connection.on('ReceiveNotification', message => {
                        console.log('Received notification:', message);
                        setNotifications(notifications => [...notifications, message]);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendNotification = () => {
        fetch('https://localhost:7205/api/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('medicareHubToken')}`
            },
            body: JSON.stringify({ UserId: 66, Message: 'Test notification to user 66' })
        }).then(response => {
            if (response.ok) {
                console.log('Notification sent successfully');
            } else {
                console.error('Failed to send notification');
            }
        }).catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        sendNotification();
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationComponentlk;
