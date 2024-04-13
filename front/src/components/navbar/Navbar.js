import { AppBar, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Avatar } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { jwtDecode } from "jwt-decode";

// ... (imports)

const Navbar = () => {
  const [auth, setAuth] =useState(true);
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [Name,setName]=useState(null)

  const handleChange = (event) => {
      setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };

  useEffect(()=>{
    let tmp=localStorage.getItem('medicareHubToken')
    if(tmp!==null){
        setName(jwtDecode(localStorage.getItem('medicareHubToken')).Name)
    }
  },[])

  return (
    <AppBar sx={{ backgroundColor: '#f7f8f7' }} elevation={0}>
    <Toolbar style={{ justifyContent: "space-between" }}>

    {/* ==================  Medicare hub Name ===================================*/}
    <Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
            <LocalHospitalIcon
                style={{ color: "red", marginRight: "8px" }}
                fontSize="large"
            />
            <span style={{ color: "#09D636", fontWeight: "bold", fontSize: 25 }}>
                Medicare
            </span>
            <span style={{ color: "#AFDCB9", fontWeight: "bold", fontSize: 25 }}>
                Hub
            </span>
        </div>
    </Typography>

 
    <div style={{ display: "flex", alignItems: "center" }}>
    <Typography color="#9F9D9D">{Name}</Typography>
    <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="black"
    >
        <AccountCircle />
    </IconButton>

    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
    >
        <MenuItem onClick={handleClose}>Help</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
    </div>
                  
    </Toolbar>
    </AppBar>
  );
};

export default Navbar;

