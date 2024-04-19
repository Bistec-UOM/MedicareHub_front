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
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const ResNavBar = ({ isClosing, setMobileOpen, mobileOpen }) => {
  const [profile,SetProfile]=useState({Name:"Profile",Role:"Empty",Image:""})
  const drawerWidth = 358.4;
  
  //drop down menu
  const [anchorEl, setAnchorEl] =useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Profile icon
  const handleMenu = (event) => {    
    setAnchorEl(event.currentTarget);
  };


  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigate=useNavigate()
  const handleDelete=()=>{
    localStorage.removeItem('medicareHubToken');
    handleClose()
    navigate('/')
  }

  useEffect(()=>{
    let tmp=localStorage.getItem('medicareHubToken')
    if(tmp!==null){
      SetProfile({
        Name:jwtDecode(localStorage.getItem('medicareHubToken')).Name,
        Role:jwtDecode(localStorage.getItem('medicareHubToken')).Role,
        Image:jwtDecode(localStorage.getItem('medicareHubToken')).Profile
      })
    }
  },[])

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


    {/* ===================  Medicare Hub logo and Name =====================================*/}
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
            profile.Name=="Profile"?
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
            <MenuItem onClick={handleDelete}>
              <LogoutIcon sx={{ paddingRight: "10%" }} /> LogOut
            </MenuItem>
            </Menu>
      </div>
  </Toolbar>
  </AppBar>

  );
};

export default ResNavBar;
