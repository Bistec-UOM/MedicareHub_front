import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Notiadmin = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/notificationHub")
        .withAutomaticReconnect()
        .build();
  
      connection.start().then(() => {
        console.log('Connected to SignalR hub');
        connection.on('ReceiveNotification', (message) => {
          setMessage(message);
        });
      }).catch(err => console.error('Connection failed: ', err));
  
      return () => {
        connection.stop();
      };
    }, []);
  
    return (
      <div>
        <h1>Notification</h1>
        {message && <p>{message}</p>}
      </div>
    );
}

export default Notiadmin;
