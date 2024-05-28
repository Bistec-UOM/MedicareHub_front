import { AppBar, Toolbar, Typography, Avatar, IconButton, MenuItem, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; // Ensure correct import
import { HubConnectionBuilder } from '@microsoft/signalr';
import { deleteLog } from "../../Services/Auth";

const Navbar = () => {
  const [profile, setProfile] = useState({ name: "", role: "", image: "", Id: "" });
  const [connection, setConnection] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

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
    const token = localStorage.getItem('medicareHubToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setProfile({
        name: decodedToken.Name,
        role: decodedToken.Role,
        image: decodedToken.Profile,
        Id: decodedToken.Id
      });
    }
  }, []);

  useEffect(() => {
    if (profile.Id) {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7205/notificationHub')
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      newConnection.start()
        .then(() => {
          console.log('Connected!');
          console.log('name:', profile.name);
          console.log('Id:', profile.Id);
          console.log('Role:', profile.role);
          newConnection.invoke('Send', profile.Id, profile.role);
        })
        .catch(err => console.error('Connection failed: ', err));

      return () => {
        if (newConnection) {
          newConnection.stop()
            .then(() => console.log('Connection stopped'))
            .catch(err => console.error('Error while stopping connection:', err));
        }
      };
    }
  }, [profile]);

  return (
    <AppBar sx={{ backgroundColor: '#f7f8f7' }} elevation={0}>
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
            <Typography color="#030303">{profile.name}</Typography>
            <Typography color="#AFADAD" sx={{ fontSize: '12px', textAlign: 'right' }}>{profile.role}</Typography>
          </div>
          <Avatar
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ ml: '5px', cursor: 'pointer' }}
            src={profile.image || ""}
          >
            {profile.name === "" && <AccountCircle />}
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

export default Navbar;
