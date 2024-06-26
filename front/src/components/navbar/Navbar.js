import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  MenuItem,
  Menu,
  List,
  ListItem,
  ListItemText,
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
import { baseURL, endPoints } from "../../Services/Appointment";
import { setHeaders } from "../../Services/Auth";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import { baseURLA, endPointsA } from "../../Services/Admin";
import { NotificationPrompt } from "../Common";
import EditUserDialog from "../Admin/DialogComponents/EditUserDialog";
import UserPopUp from "../Admin/DialogComponents/UserPopUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SuccessNotification from "../recepcomponents/SnackBar/SuccessNotification";

const Navbar = () => {
  const [profile, setProfile] = useState({
    name: "Profile",
    role: "Empty",
    image: "",
    Id: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const [notificationOpen, setNotificationOpen] = useState(false); //var for notification popup open
  const [notiMessage, setNotiMessage] = useState(""); //var for notificatin message
  const [notiType, setNotiType] = useState("success"); //var for notification type

  const handleNotification = (msg, type) => {
    setNotiMessage(msg);
    setNotificationOpen(true);
    setNotiType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // setEditOpen(false);
  };
  const navigate = useNavigate();

  //notification prompt functions
  const [openNotify, setOpenNotify] = useState(false);
  const handleClickOpenNotify = (x) => {
    //change the status of seen appointments
    setOpenNotify(true);
    setBadgeContent(0);
    axios.put(
      baseURL +
        endPoints.MarkAsSennNotification +
        `${userId}` +
        "/user/" +
        `${true}`,
      setHeaders()
    );
  };
  const handleCloseNotify = () => {
    setOpenNotify(false);
  };

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++                     CHATHURA              +++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [notificationList, setNotificationList] = useState([]); //notification list
  const [notificationMessages, setNotificationMessages] = useState([]); //retreived messages from notificationList
  const [badgeContent, setBadgeContent] = useState(0); //var for notification count
  const [anchorElPop, setAnchorElPop] = useState(null);
  const [AppNotificationconnection, setAppNotiConnection] = useState(null);

  let userId = 0; // Default value

  const token = localStorage.getItem("medicareHubToken");
  if (token) {
    try {
      userId = jwtDecode(token).Id;
    } catch (error) {
      console.error("Error decoding token:", error);
      // If decoding fails, userId remains 0
    }
  }

  useEffect(() => {
    //use effect for connection with hub

    // Create a connection to the SignalR hub
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(baseURL + `/appointmentnotificationHub?userId=${userId}`)
      .configureLogging(signalR.LogLevel.Information)
      .build();
    // Set up the connection
    setAppNotiConnection(newConnection);
  }, []);

  useEffect(() => {
    if (AppNotificationconnection) {
      AppNotificationconnection.start()
        .then(() => {
          console.log("Notification sent to pharmacist");
          AppNotificationconnection.on("ReceiveNotification", (message) => {
            console.log("Notification received:", message);
            setNotificationList((notificationMessages) => [
              ...notificationMessages,
              message,
            ]);
            setBadgeContent(1);
          });
        })
        .then(() => {
          console.log("Connection started successfully");
          AppNotificationconnection.invoke("NotiToPharmacist");
        })
        .catch((e) => console.log("Connection failed: ", e));
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
      baseURL +
        endPoints.MarkAsSennNotification +
        `${userId}` +
        "/user/" +
        `${true}`,
      setHeaders()
    );
  };

  useEffect(() => {
    //use effect for fetching notification list
    axios
      .get(baseURL + endPoints.notifications + `${userId}`, setHeaders())
      .then((response) => {
        setNotificationList(response.data);
      })
      .catch((error) => {
        handleNotification("Error fetching notifications", "error");
      });
  }, [openNotify]);

  useEffect(() => {
    // Extract only  messages from notificationList and set notificationMessages
    setBadgeContent(notificationList.filter((notification) => notification.seen === false).length);
    console.log("notilist", notificationList.filter((notification) => notification.seen === false).length);    const messages = notificationList.map(
      (notification) => notification.message
    );
    const unseenNotifications = notificationList.filter(
      (notification) => notification.seen === false
    );
    // setBadgeContent(unseenNotifications.length >= 1 ? 1 : 0);
    setNotificationMessages(messages);
  }, [notificationList]);

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++                    YASIRU                  ++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [connection, setConnection] = useState(null);

  const handleLogout = () => {
    //AUTH----------------------------------
      deleteLog();
      handleClose();
      navigate("/");
  };

  useEffect(() => {
    //AUTH----------------------------------------
    console.log("nlist", notificationList);
    const token = localStorage.getItem("medicareHubToken");
    if (token) {
      const decodedToken = jwtDecode(token); //---------------
      setProfile({
        //  LOGIN
        name: decodedToken.Name, //---------------
        role: decodedToken.Role,
        image: decodedToken.Profile,
        Id: decodedToken.Id,
      });
    }
  }, []);

  useEffect(() => {
    if (profile.Id) {
      const newConnection = new HubConnectionBuilder()

        .withUrl(baseURLA + "/notificationHub")
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
      newConnection
        .start()
        .then(() => {
          console.log("Connected!");
          newConnection.invoke("Send", profile.Id, profile.role);
          newConnection.on("ReceiveNotification", (message) => {
            console.log("inside receive side notification", message); // Log the received message
            // setNotificationMessages(notificationMessages => [...notificationMessages, message]); // Add new notification to the list
            setBadgeContent(1); // Increase badge content for new notification
          });
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

  // ///////////////////////////// NAv bar Profile ///////////////////////////////
  const [editOpen, setEditOpen] = useState(false);
  const PopUp = () => {
    setEditOpen(true);
  };

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++                    DHAMMIKA                ++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
              {profile.name === "Profile" && <AccountCircle />}
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
              {badgeContent >= 1 ? (
                <NotificationsIcon
                  color="action"
                  sx={{ paddingRight: "10%" }}
                />
              ) : (
                <NotificationsNoneIcon
                  color="action"
                  sx={{ paddingRight: "10%" }}
                />
              )}{" "}
              Notification
            </MenuItem>
            <MenuItem onClick={PopUp}>
              <AccountCircleIcon sx={{ paddingRight: "10%" }} /> My profile
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
        <NotificationPrompt
          messageList={notificationList}
          handleClose={handleCloseNotify}
          open={openNotify}
        ></NotificationPrompt>
      </Toolbar>
      {/* use details */}
      <UserPopUp
        profile={profile}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      ></UserPopUp>
      <SuccessNotification
        id="doctorappnotification"
        type={notiType}
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
      />
    </AppBar>
  );
};

export default Navbar;
