import { AppBar, Toolbar } from "@mui/material";
import React from "react";
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

const ResNavBar = ({ isClosing, setMobileOpen, mobileOpen }) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const drawerWidth = 358.4;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <div>
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

          {auth && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "2%",
              }}
            >
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
                  vertical: "bottom", // Align the bottom of the menu with the bottom of the IconButton
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    backgroundColor: "#ffff", // Set the background color of the Menu
                    paddingRight: "3%",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <HelpOutlineIcon sx={{ paddingRight: "10%" }} />
                  Help
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <SettingsIcon sx={{ paddingRight: "10%" }} /> Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <LogoutIcon sx={{ paddingRight: "10%" }} /> LogOut
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ResNavBar;
