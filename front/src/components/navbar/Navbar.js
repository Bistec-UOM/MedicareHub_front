import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  MenuItem,
  Menu,
 List, ListItem, ListItemText
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure correct import
import { HubConnectionBuilder } from "@microsoft/signalr";
import { deleteLog } from "../../Services/Auth";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "@mui/material/Popover";
import { baseURL,endPoints } from "../../Services/Appointment";
import { setHeaders } from "../../Services/Auth";
import axios from "axios";
import * as signalR from '@microsoft/signalr';



const Navbar = () => {
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    image: "",
    Id: "",
  });
  const [connection, setConnection] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [notificationList,setNotificationList]=useState([]) //notification list
  const [notificationMessages,setNotificationMessages]=useState([]); //retreived messages from notificationList

  const [badgeContent, setBadgeContent] = useState(0); //var for notification count

  const [anchorElPop, setAnchorElPop] = useState(null);


  const [AppNotificationconnection, setAppNotiConnection] = useState(null);

  let userId = 0;  // Default value

const token = localStorage.getItem("medicareHubToken");
if (token) {
  try {
    userId = jwtDecode(token).Id;
  } catch (error) {
    console.error("Error decoding token:", error);
    // If decoding fails, userId remains 0
  }
}

  

  useEffect(() => {  //use effect for connection with hub

    // Create a connection to the SignalR hub
    const newConnection = new signalR.HubConnectionBuilder()
    .withUrl(`https://localhost:7205/appointmentnotificationHub?userId=${userId}`)
    .configureLogging(signalR.LogLevel.Information)
    .build();
    // Set up the connection
    setAppNotiConnection(newConnection);
  }, []);

  useEffect(() => {  //use effect for receiving real time notification
    console.log("before con");
    if (AppNotificationconnection) {
      // Start the connection
      AppNotificationconnection.start()
        .then(result => {
          console.log('Connected! helo');
          // Set up a listener for notifications
          AppNotificationconnection.on('ReceiveNotification', message => {
            console.log("inside receive side notification",message); //adding new real time notitication to the notification messages list
            setNotificationMessages(notificationMessages => [...notificationMessages, message]);
            setBadgeContent(badgeContent+1);  //increate badge content for new real time notification
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [AppNotificationconnection]);

  const handleClosePopOver = () => {
    setAnchorElPop(null);
  };

  const openPopOver = Boolean(anchorElPop);
  const id = openPopOver ? "simple-popover" : undefined;

  const handleNotificationBell = (event) => {
    setAnchorElPop(event.currentTarget);
    setBadgeContent(0);
    axios.put(
      baseURL+endPoints.MarkAsSennNotification+`${userId}`+"/user/"+`${true}`,setHeaders());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  useEffect(() => {  //use effect for fetching notification list
    axios
      .get(baseURL + endPoints.notifications + `${userId}`,setHeaders())
      .then((response) => {
        setNotificationList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching disabled dates:", error);
      });
  }, []);

  useEffect(() => {  // Extract only  messages from notificationList and set notificationMessages 
      const messages = notificationList.map((notification) => notification.message);
      const unseenNotifications = notificationList.filter(notification => notification.seen===false);
      setBadgeContent(unseenNotifications.length);
      setNotificationMessages(messages);
  
  }, [notificationList]);

  const handleLogout = () => {
    if (connection) {
      connection
        .invoke("ManualDisconnect", profile.Id)
        .then(() => connection.stop())
        .then(() => {
          deleteLog();
          handleClose();
          navigate("/");
        })
        .catch((err) => console.error("Error while disconnecting:", err));
    } else {
      deleteLog();
      handleClose();
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("nlist",notificationList);
    const token = localStorage.getItem("medicareHubToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setProfile({
        name: decodedToken.Name,
        role: decodedToken.Role,
        image: decodedToken.Profile,
        Id: decodedToken.Id,
      });
    }
  }, []);

  useEffect(() => {
    if (profile.Id) {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7205/notificationHub')
        // .withUrl('https://mediicarehub.azurewebsites.net/notificationHub')
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      newConnection
        .start()
        .then(() => {
          console.log("Connected!");
          console.log("name:", profile.name);
          console.log("Id:", profile.Id);
          console.log("Role:", profile.role);
          newConnection.invoke("Send", profile.Id, profile.role);
        })
        .catch((err) => console.error("Connection failed: ", err));

      return () => {
        if (newConnection) {
          newConnection
            .stop()
            .then(() => console.log("Connection stopped"))
            .catch((err) =>
              console.error("Error while stopping connection:", err)
            );
        }
      };
    }
  }, [profile]);

  return (
    <AppBar sx={{ backgroundColor: "#f7f8f7" }} elevation={0}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <IconButton
          color="black"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LocalHospitalIcon
              style={{ color: "red", marginRight: "8px" }}
              fontSize="large"
            />
            <span
              style={{ color: "#09D636", fontWeight: "bold", fontSize: 25 }}
            >
              Medicare
            </span>
            <span
              style={{ color: "#AFDCB9", fontWeight: "bold", fontSize: 25 }}
            >
              Hub
            </span>
          </div>
        </Typography>

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "2%" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography color="#030303">{profile.name}</Typography>
            <Typography
              color="#AFADAD"
              sx={{ fontSize: "12px", textAlign: "right" }}
            >
              {profile.role}
            </Typography>
          </div>
          <Badge badgeContent={badgeContent} color="secondary">
          <Avatar
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ ml: "5px", cursor: "pointer" }}
            src={profile.image || ""}
          >
            {profile.name === "" && <AccountCircle />}
          </Avatar>
          </Badge>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <HelpOutlineIcon sx={{ paddingRight: "10%" }} />
              Help
            </MenuItem>
            <MenuItem onClick={handleNotificationBell}>
            {badgeContent > 1 ? (
                <NotificationsIcon color="action" sx={{ paddingRight: "10%" }} />
              ) : (
                <NotificationsNoneIcon color="action" sx={{ paddingRight: "10%" }} />
              )} Notification
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SettingsIcon sx={{ paddingRight: "10%" }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ paddingRight: "10%" }} /> LogOut
            </MenuItem>
          </Menu>
          <Popover
            id={id}
            open={openPopOver}
            anchorEl={anchorElPop}
            onClose={handleClosePopOver}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
           <List>
              {notificationMessages.map((notification, index) => (
                <ListItem key={index}>
                  <ListItemText primary={notification} />
                </ListItem>
              ))}
            </List>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
