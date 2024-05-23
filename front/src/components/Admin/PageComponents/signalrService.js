import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7205/notificationHub", {
        accessTokenFactory: () => localStorage.getItem("medicareHubToken")
    })
    .withAutomaticReconnect()
    .build();

connection.on("ReceiveNotification", (message) => {
    console.log("Notification received:", message);
    // Handle the notification (e.g., update state, show a toast notification, etc.)
});

export async function startConnection() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log("Error while starting connection: ", err);
        setTimeout(startConnection, 5000); // Retry connection after 5 seconds
    }
}

export async function sendNotificationToUser(userId, message) {
    try {
        await connection.invoke("SendNotificationToUser", userId, message);
    } catch (err) {
        console.error("Error sending notification:", err);
    }
}

startConnection();
