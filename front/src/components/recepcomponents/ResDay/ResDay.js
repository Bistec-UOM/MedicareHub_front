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
import { useLocation } from 'react-router-dom';
import SearchPatientPage from '../SearchPatientPage/SearchPatienPage';
import DayList from '../DayAppList/DayAppList';
import ResDayList from '../ResDayList/ResDayList';
import '../../../recep.css'

const drawerWidth = 358.4;

function ResDay() {
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

  const [selectedTab, setSelectedTab] = useState(0);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

 

  const [appointmentlist,setAppointmentList]=useState([])
 

 const [renderVal,setRenderVal]=useState(false);

 

 const location=useLocation();
 const {doctorid}=location.state;

 const [docid,setDocid]=useState(doctorid)
 console.log(doctorid);

 
 




 const [appointlist,setAppointList]=useState([
   {
     name:'kamal',
     city:'Colombo',
     today:'January 6, 2024',
     nic:'21433454325',
     phone:'0774733245',
     time:'8.30 AM',
     did:0
     

   },
   {
     name:'akila',
     city:'Colombo',
     today:'January 6, 2024',
     nic:'4524523',
     phone:'0774733245',
     time:'9.00 AM',
     did:0,
     

   },
   {
     name:'namal',
     city:'Colombo',
     today:'January 6, 2024',
     nic:'452452343',
     phone:'0774733245',
     time:'9.30 AM',
     did:0,
     

   },
   {
     name:'sachith',
     city:'Colombo',
     today:'January 6, 2024',
     nic:'4524543223',
     phone:'0774733245',
     time:'10.00 AM',
     did:0,
     

   },
   {
     name:'vihanga',
     city:'Colombo',
     today:'January 6, 2024',
     nic:'45244332523',
     phone:'0774733245',
     time:'10.30 AM',
     did:0
     

   },
   {
     name:'ranil',
     city:'Moratuwa',
     today:'January 6, 2024',
     nic:'54325324',
     phone:'0742314567',
     time:'11.00 AM',
     did:0
     

   },
   {
     name:'saman',
     city:'kandy',
     today:'January 6, 2024',
     nic:'54243252',
     phone:'0774733245',
     time:'9.30 AM',
     did:0,

   },

   {
     name:'nipun',
     city:'galle',
     today:'January 6, 2024',
     nic:'5243525',
     phone:'0774733245',
     time:'9.30 AM',
     did:0
   }
 ]);

 const data=[
   {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
   {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
   {'name':'Tharushi Fernando','title':'MBBS, MD'},
   {'name':'Infas Mohomad','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'},
   {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
   {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
   {'name':'Tharushi Fernando','title':'MBBS, MD'},
   {'name':'Infas Mohomad','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'}
   
] 




 const [search,setSearch]=useState("")

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Grid item xs={3} sm={1} md={3}>
           <SidebarContainer>
            <SidebarTop>
              <SearchBar search={search} setSearch={setSearch} mgl="10%" isDisabled={true} placename="Doctor name"></SearchBar>
            </SidebarTop>
            <SidebarList>
            <Box sx={{overflowY:'scroll',height:'81vh'}}>
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
              <div style={{width:'100%',marginTop:'2%'}}>
              {data.filter((item)=>{
                  return search.toLowerCase()===''?item:item.name.toLowerCase().includes(search.toLowerCase());
              }).map((item,index)=>(
                <div
                key={index}
               // onClick={() => setSelectedTab(index)}
                style={{
                  backgroundColor: docid === index ? '#79CCBE' : 'transparent',
                   padding: '10px',
                   margin: '5px',
                  cursor: 'pointer',
                  borderRadius:'8px'
                }}
              >
                <Sideunit_Doctor selectedTab={docid} name={item.name} title={item.title} index={index} key={index}></Sideunit_Doctor>
              </div>
               
                
                
               
              ))}

              </div>
              </Box>
               
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
      {/* <Grid sx={{paddingLeft:'10px',paddingRight:'10px',paddingTop:'64px',width:'100%', height:'100%'}} item xs={9} sm={11} md={9}>
          {renderVal ?  <SearchPatientPage renderVal={renderVal} setRenderVal={setRenderVal}/> :<ResDayList  docid={docid} appointlist={appointlist} renderVal={renderVal} setRenderVal={setRenderVal}/>}
          </Grid> */}
          <Box
        component="main"
        sx={{ flexGrow: 1,height:{
          xs:'85vh',
          sm:'90vh',
          md:'100vh'
        }, p: 3, width: { xs:'100%',sm: `calc(100% - ${drawerWidth}px)` } }}
      >
       
        
        <Grid sx={{paddingRight:'10px',paddingTop:{
          md:'54px',
          xs:'30px'
        },width:'100%', height:'100%'}} item xs={9} sm={11} md={9}>
        {renderVal ?  <SearchPatientPage renderVal={renderVal} setRenderVal={setRenderVal}/> :<ResDayList  docid={docid} appointlist={appointlist} renderVal={renderVal} setRenderVal={setRenderVal}/>}   
          </Grid>
        
      </Box>
    </Box>
   
  );
}



export default ResDay;
