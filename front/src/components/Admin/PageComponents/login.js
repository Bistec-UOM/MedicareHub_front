import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is imported correctly

const Login = () => {
    const [profile, setProfile] = useState({ name: '', role: '', image: '' });
    const [connection, setConnection] = useState(null);
    const [users, setUsers] = useState([]); // State to store the list of users

    useEffect(() => {
        const token = localStorage.getItem('medicareHubToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setProfile({
                name: decodedToken.Name,
                role: decodedToken.Role,
                image: decodedToken.Id
            });
            window.addEventListener('beforeunload', function (e) {
                e.preventDefault();
                e.returnValue = ''; // Some browsers require this to show the alert
            });
            // Setup SignalR connection
            const newConnection = new HubConnectionBuilder()
                .withUrl('https://localhost:7205/notificationHub')
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    // connection.invoke('Send', profile.image, profile.role)
                    //     .then(() => console.log('Sent message'))
                    //     .catch(err => console.error(err));

                    // Call UsersCalling to get the initial list of users
                    connection.invoke('UsersCalling')
                        .then(() => console.log('Requested users list'))
                        .catch(err => console.error(err));

                    // Handle broadcast messages
                    connection.on('broadcastMessage', (name, message) => {
                        console.log('Broadcast message received:', name, message);
                        // Handle the received broadcast message here
                        alert(`Broadcast message from ${name}: ${message}`);
                    });

                    // Handle receiving the list of users
                    connection.on('Receiver', (usersJson) => {
                        const usersList = JSON.parse(usersJson);
                        setUsers(usersList);
                        console.log('Received users list:', usersList);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection, profile]);


    const handleManualDisconnect = () => {
        if (connection) {
            connection.invoke('ManualDisconnect', profile.image)
                .then(() => connection.stop())
                .then(() => console.log('Manually disconnected'))
                .catch(err => console.error('Error while disconnecting:', err));
        }
    };


    return (
        <div>
            <p>Name: {profile.name}</p>
            <p>Role: {profile.role}</p>
            <p>Image: {profile.image}</p>

            <div>
                <h3>Users List:</h3>
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.Name} - {user.Id} - {user.IsActive ? 'Active' : 'Inactive'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users connected.</p>
                )}
            </div>

            <button onClick={handleManualDisconnect}>Manual Disconnect</button>
        </div>
    );
};

export default Login;
