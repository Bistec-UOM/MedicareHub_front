import { AppBar, Toolbar } from "@mui/material";
import React from "react";
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


// ... (imports)

const Navbar = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
      setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
      <div>
          <AppBar sx={{ backgroundColor: '#f7f8f7' }} elevation={0}>
              <Toolbar style={{ justifyContent: "space-between" }}>
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

                  {auth && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography color="#9F9D9D">Mario</Typography>
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
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                  vertical: 'bottom', // Align the bottom of the menu with the bottom of the IconButton
                                  horizontal: 'right',
                              }}
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              
                                sx= {{backgroundColor:'#ffffff' , // Set the background color of the Menu
                                  paddingRight:'3%'}}
                           
                          >
                              <MenuItem onClick={handleClose}><HelpOutlineIcon sx={{ paddingRight: '10%' }} />Help</MenuItem>
                              <MenuItem onClick={handleClose}><SettingsIcon sx={{ paddingRight: '10%' }} /> Settings</MenuItem>
                              <MenuItem onClick={handleClose}><LogoutIcon sx={{ paddingRight: '10%' }} /> LogOut</MenuItem>
                          </Menu>
                      </div>
                  )}
              </Toolbar>
          </AppBar>
      </div>
  );
};

export default Navbar;

