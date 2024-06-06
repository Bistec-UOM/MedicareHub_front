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

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // +++++++++++++++++++                    CHATHURA                  ++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  const [notificationList,setNotificationList]=useState([]) //notification list
  const [badgeContent, setBadgeContent] = useState(3); //var for notification count
  const [anchorElPop, setAnchorElPop] = useState(null);

  let userId = 0;  // Default value

const token = localStorage.getItem("medicareHubToken");
if (token) {
  try {
    userId = jwtDecode(token).Id;
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

  const handleClosePopOver = () => {
    setAnchorElPop(null);
  };

  const openPopOver = Boolean(anchorElPop);
  const id = openPopOver ? "simple-popover" : undefined;

  const handleNotificationBell = (event) => {
    setAnchorElPop(event.currentTarget);
    setBadgeContent(0);
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
    .withUrl('https://localhost:7205/notificationHub')
    // .withUrl('https://mediicarehub.azurewebsites.net/notificationHub')
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ResNavBar;
