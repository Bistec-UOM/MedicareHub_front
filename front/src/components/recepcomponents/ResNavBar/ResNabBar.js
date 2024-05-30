import { AppBar, Avatar, Toolbar } from "@mui/material";
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
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { deleteLog } from "../../../Services/Auth";
import { HubConnectionBuilder } from '@microsoft/signalr';

const ResNavBar = ({ isClosing, setMobileOpen, mobileOpen }) => {
  const [profile, setProfile] = useState({ Name: "Profile", Role: "Empty", Image: "", Id: "" });
  const [connection, setConnection] = useState(null);
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

  const handleLogout = () => {
    if (connection) {
      connection.invoke('ManualDisconnect', profile.Id)
        .then(() => connection.stop())
        .then(() => {
          deleteLog();
          handleClose();
          navigate('/');
        })
        .catch(err => console.error('Error while disconnecting:', err));
    } else {
      deleteLog();
      handleClose();
      navigate('/');
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('medicareHubToken');
    if (token !== null) {
      let decodedToken = jwtDecode(token);
      setProfile({
        Id: decodedToken.Id,
        Name: decodedToken.Name,
        Role: decodedToken.Role,
        Image: decodedToken.Profile
      });
    }

    const newConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7205/notificationHub')
    // .withUrl('https://mediicarehub.azurewebsites.net/notificationHub')
    .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection.start()
      .then(() => {
        console.log('Connected!');
        newConnection.invoke('Send', profile.Id, profile.Role)
          .then(() => console.log('Sent message'))
          .catch(err => console.error('Error sending message:', err));
      })
      .catch(err => console.error('Connection failed: ', err));

    return () => {
      if (newConnection) {
        newConnection.stop()
          .then(() => console.log('Connection stopped'))
          .catch(err => console.error('Error while stopping connection:', err));
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
            <LocalHospitalIcon style={{ color: "red", marginRight: "8px" }} fontSize="large" />
            <span style={{ color: "#09D636", fontWeight: "bold", fontSize: 25 }}>
              Medicare
            </span>
            <span style={{ color: "#AFDCB9", fontWeight: "bold", fontSize: 25 }}>
              Hub
            </span>
          </div>
        </Typography>

        <div style={{ display: "flex", alignItems: "center", marginLeft: "2%" }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography color="#030303">{profile.Name}</Typography>
            <Typography color="#AFADAD" sx={{ fontSize: '12px', textAlign: 'right' }}>{profile.Role}</Typography>
          </div>
          <Avatar
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ ml: '5px', cursor: 'pointer' }}
            src={profile.Image || ""}
          >
            {profile.Name === "Profile" && <AccountCircle />}
          </Avatar>

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
            <MenuItem onClick={handleClose}>
              <SettingsIcon sx={{ paddingRight: "10%" }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ paddingRight: "10%" }} /> LogOut
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ResNavBar;
