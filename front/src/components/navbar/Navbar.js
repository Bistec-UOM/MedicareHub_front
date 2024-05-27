import { AppBar, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Avatar } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { deleteLog } from "../../Services/Auth";


const Navbar = () => {
    
  const [profile, SetProfile] = useState({ name: '', role: '', image: '' ,Id:''});
  const [connection, setConnection] = useState(null);
  const [auth, setAuth] =useState(true);
  const [anchorEl, setAnchorEl] =useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Profile icon
  const handleMenu = (event) => {    
    setAnchorEl(event.currentTarget);
  };


  const navigate=useNavigate()
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

  useEffect(()=>{
    let tmp=localStorage.getItem('medicareHubToken')
    if(tmp!==null){
      SetProfile({
        Name:jwtDecode(localStorage.getItem('medicareHubToken')).Name,
        Role:jwtDecode(localStorage.getItem('medicareHubToken')).Role,
        Image:jwtDecode(localStorage.getItem('medicareHubToken')).Profile,
        Id:jwtDecode(localStorage.getItem('medicareHubToken')).Id
      })
    }
    const newConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7205/notificationHub')
    .withAutomaticReconnect()
    .build();

  newConnection.start()
    .then(() => setConnection(newConnection))
    .catch(err => console.error('Connection failed: ', err));

  return () => {
    if (connection) {
      connection.stop()
        .then(() => console.log('Connection stopped'))
        .catch(err => console.error('Error while stopping connection:', err));
    }
  };
  },[])

  return (
    <AppBar sx={{ backgroundColor: '#f7f8f7' }} elevation={0}>
    <Toolbar style={{ justifyContent: "space-between" }}>

    {/* ==================  Medicare hub Name ===================================*/}
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
          <LocalHospitalIcon style={{ color: "red", marginRight: "8px" }} fontSize="large"/>
          <span style={{ color: "#09D636", fontWeight: "bold", fontSize: 25 }}>
            Medicare
          </span>
          <span style={{ color: "#AFDCB9", fontWeight: "bold", fontSize: 25 }}>
            Hub
          </span>
        </div>
      </Typography>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "2%",
        }}
      >
          <div style={{display:'flex',flexDirection:'column'}}>
            <Typography color="#030303" >{profile.Name}</Typography>
            <Typography color="#AFADAD" sx={{fontSize:'12px',textAlign:'right'}}>{profile.Role}</Typography>
          </div>
          {
            profile.Name==="Profile"?
          <Avatar
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ml:'5px',cursor:'pointer'}}
          >
            <AccountCircle />
          </Avatar>:
          <Avatar
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ml:'5px',cursor:'pointer'}}
            src={profile.Image}
            >
          </Avatar>
          }

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "bottom",horizontal: "right"}}
            transformOrigin={{vertical: "top",horizontal: "right"}}
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

