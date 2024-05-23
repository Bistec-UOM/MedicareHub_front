import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { jwtDecode } from "jwt-decode";

const NotificationComponentlk = () => {
    const [connection, setConnection] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [profile,setProfile]=useState({Name:'',Role:''});

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

useEffect(() => {
    let tmp = localStorage.getItem('medicareHubToken');
    if(tmp !== null){
        setProfile({
            Name:jwtDecode(localStorage.getItem('medicareHubToken')).Name,
            Role:jwtDecode(localStorage.getItem('medicareHubToken')).Role
        })
    }
}, []);

    return (
        <div>
            <h2>Notifications</h2>
            <h3>{profile.Name}</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationComponentlk;
