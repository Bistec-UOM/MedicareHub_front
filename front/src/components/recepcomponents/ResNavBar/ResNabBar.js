import { AppBar, Avatar, Toolbar, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { deleteLog } from "../../../Services/Auth";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "@mui/material/Popover";
import axios from "axios";
import { baseURL,endPoints } from "../../../Services/Appointment";
import { setHeaders } from "../../../Services/Auth";
import * as signalR from '@microsoft/signalr';
import { baseURLA,endPointsA } from "../../../Services/Admin";
import UserPopUp from "../../Admin/DialogComponents/UserPopUp";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NotificationPrompt } from "../../Common";

const ResNavBar = ({ isClosing, setMobileOpen, mobileOpen }) => {
  const [profile, setProfile] = useState({Name: "Profile",Role: "Empty",Image: "",Id: ""});
  const [anchorEl, setAnchorEl] = useState(null);
  
  const drawerWidth = 358.4;
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

   //notification prompt functions
   const [openNotify, setOpenNotify] = useState(false)
   const handleClickOpenNotify = (x) => {
        setOpenNotify(true)
        setBadgeContent(0);
        axios.put(
          baseURL+endPoints.MarkAsSennNotification+`${userId}`+"/user/"+`${true}`,setHeaders());
  }
  const handleCloseNotify = () => {setOpenNotify(false)} 

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++                    CHATHURA                  ++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
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
  }
}





  useEffect(() => {  //use effect for connection with hub

    // Create a connection to the SignalR hub
    const newConnection = new signalR.HubConnectionBuilder()
    .withUrl(baseURL+`/appointmentnotificationHub?userId=${userId}`)
    .configureLogging(signalR.LogLevel.Information)
    .build();
    // Set up the connection
    setAppNotiConnection(newConnection);
  }, []);

  useEffect(() => {  //use effect for real time notification
    console.log("before con", AppNotificationconnection);
    if (AppNotificationconnection) {
      console.log("Attempting to start connection...");
      // Start the connection
      AppNotificationconnection.start()
        .then(result => {
        //  AppNotificationconnection.invoke("NotiToPharmacist")
          console.log("Connection started successfully", result);
          // Set up a listener for notifications
          AppNotificationconnection.on('ReceiveNotification', message => {
            console.log('Connected! helo', AppNotificationconnection.connectionId);
            console.log("inside receive notification chathura callback", message.message); // Log the received message
            setNotificationList(notificationMessages => [...notificationMessages, message]); // Add new notification to the list
            setBadgeContent(badgeContent+1); // Increase badge content for new notification
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    } else {
      console.log("AppNotificationconnection is null or undefined.");
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
    console.log("notilist",notificationList);
    const messages = notificationList.map((notification) => notification.message);
    const unseenNotifications = notificationList.filter(notification => notification.seen===false);
    setBadgeContent(unseenNotifications.length);
    setNotificationMessages(messages);

}, [notificationList]);


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++                    YASIRU                  ++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [connection, setConnection] = useState(null);

  const handleLogout = () => {//AUTH-----------------------------------------------------
    if (connection) {
      connection
        .invoke("ManualDisconnect", profile.Id)                   //------------------
        .then(() => connection.stop())                            //  LOOGOUT    
        .then(() => {                                             //------------------
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
    let token = localStorage.getItem("medicareHubToken");
    if (token !== null) {
      let decodedToken = jwtDecode(token);                           //-----------------
      setProfile({                                                   // LOGIN  
        Id: decodedToken.Id,                                         // ---------------
        Name: decodedToken.Name,
        Role: decodedToken.Role,
        Image: decodedToken.Profile,
      });
    }

    const newConnection = new HubConnectionBuilder()

    .withUrl(baseURLA+endPointsA.C_Notification)
    .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Connected!");
        newConnection
          .invoke("Send", profile.Id, profile.Role)
          .then(() => console.log("Sent message"))
          .catch((err) => console.error("Error sending message:", err));
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
  }, [profile.Id, profile.Role]);

    // ///////////////////////////// NAv bar Profile ///////////////////////////////
    const [editOpen, setEditOpen] = useState(false);
    const PopUp = ()=>{
      setEditOpen(true);
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: "100%" },
        zIndex: 1300,
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "#f7f8f7",
        boxShadow: "none",
      }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <IconButton
          color="black"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
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
            <Typography color="#030303">{profile.Name}</Typography>
            <Typography
              color="#AFADAD"
              sx={{ fontSize: "12px", textAlign: "right" }}
            >
              {profile.Role}
            </Typography>
          </div>
          <Badge badgeContent={badgeContent} color="secondary">
          <Avatar
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ ml: "5px", cursor: "pointer" }}
            src={profile.Image || ""}
          >
            {profile.Name === "Profile" && <AccountCircle />}
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
            <MenuItem onClick={handleClickOpenNotify}>
            {badgeContent > 1 ? (
                <NotificationsIcon color="action" sx={{ marginRight: "10%" }} />
              ) : (
                <NotificationsNoneIcon color="action" sx={{ marginRight: "10%" }} />
              )} Notification
            </MenuItem>
            <MenuItem onClick={PopUp}>
              <AccountCircleIcon sx={{marginRight: "10%" }} /> My profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: "10%" }} /> LogOut
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
             {notificationList.length === 0 ? (
        <Typography>No new notifications</Typography>
      ) : (
        <List>
          {notificationList.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText primary={notification.message} />
            </ListItem>
          ))}
        </List>
      )}
          </Popover>
          <NotificationPrompt messageList={notificationList} handleClose={handleCloseNotify} open={openNotify}></NotificationPrompt>
        </div>
        <NotificationPrompt messageList={[]} handleClose={handleCloseNotify} open={openNotify}></NotificationPrompt>
      </Toolbar>
      <UserPopUp profile={profile} editOpen={editOpen} setEditOpen={setEditOpen}></UserPopUp>

    </AppBar>
  );
};

export default ResNavBar;
