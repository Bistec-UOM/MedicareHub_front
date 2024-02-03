import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MyCalendar from '../Calender/MyCalender';
import { Grid } from '@mui/material';
import { useState } from 'react';
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { SidebarContainer } from '../../sidebar/Sidebar';
import { SidebarTop,SidebarList } from '../../sidebar/Sidebar';
import SearchBar from '../Searchbar/Searchbar';
import { useEffect } from 'react';
import {Tabs} from '@mui/material';
import { Sideunit_Doctor } from '../../sidebar/Sideunits';

import ResNavBar from '../ResNavBar/ResNabBar';

const drawerWidth = 358.4;

function ResDrawer({selectedTab,setSelectedTab}) {
  useEffect(()=>{
    document.body.style.margin = '0';
   },[])
   

  // const [selectedTab, setSelectedTab] = useState(0);
 //  const [doctorid,setDoctorid]=useState(null)


   const handleChanges = (event, newValue) => {
     setSelectedTab(newValue);
   };
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
  

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

 

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

 

  const [appointmentlist,setAppointmentList]=useState([])
  const data=[
    {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
    {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
    {'name':'Tharushi Fernando','title':'MBBS, MD'},
    {'name':'Infas Mohomad','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'},
   
 ] 
 const [search,setSearch]=useState("")

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Grid item xs={3} sm={1} md={3}>
           <SidebarContainer>
            <SidebarTop>
              <SearchBar search={search} setSearch={setSearch} mgl="10%" isDisabled={false} placename="Doctor name"></SearchBar>
            </SidebarTop>
            <SidebarList>
            <Tabs
        orientation="vertical"
       // variant="scrollable"
        value={selectedTab}
        onChange={handleChanges}
        aria-label="example vertical tabs"
        sx={{marginTop:0}}
        
      >
              {/* {data.filter((item)=>{
                  return search.toLowerCase()===''?item:item.name.toLowerCase().includes(search.toLowerCase());
              }).map((item,index)=>(
                <Tab key={index} label="" style={{ display: 'none' }} />
                
                
                //<Sideunit_Doctor name={item.name} title={item.title} key={index}></Sideunit_Doctor>
              ))} */}
              </Tabs>
              <div style={{width:'100%'}}>
              {data.filter((item)=>{
                  return search.toLowerCase()===''?item:item.name.toLowerCase().includes(search.toLowerCase());
              }).map((item,index)=>(
                <div
                key={index}
                onClick={() => setSelectedTab(index)}
                style={{
                  backgroundColor: selectedTab === index ? '#79CCBE' : 'transparent',
                   padding: '10px',
                   margin: '5px',
                  cursor: 'pointer',
                  borderRadius:'8px'
                }}
              >
                <Sideunit_Doctor selectedTab={selectedTab} name={item.name} title={item.title} index={index} key={index}></Sideunit_Doctor>
              </div>
               
                
                
               
              ))}

              </div>
               
            </SidebarList>
           </SidebarContainer>
          </Grid>
    </div>
  );

  
  return (
   
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ResNavBar isClosing={isClosing} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth-100 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
             marginTop:'20px',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
           
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1,height:{
          xs:'85vh',
          sm:'90vh',
          md:'100vh'
        }, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
       
        

        
      </Box>
    </Box>
    
  );
}



export default ResDrawer;
