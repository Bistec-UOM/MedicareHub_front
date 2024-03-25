import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MyCalendar from '../Calender/MyCalender';
import { Grid } from '@mui/material';
import { useState } from 'react';
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
   
   const handleChanges = (event, newValue) => {
     setSelectedTab(newValue);
   };

  const location=useLocation();
  const {doctorid}=location.state;
  const {selectedDay}=location.state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [doctorList,setDoctorList]=useState(location.state.doctorList);
  const [selectedTab, setSelectedTab] = useState(doctorid);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

 const [renderVal,setRenderVal]=useState(false);  //variable for conditional rendering of daylist app and patientSearchPage
 const [dayAppTotal,setDayAppTotal]=useState(0);  //total app count of the selected day
 const [appCountUseEff,setAppCountUseEff]=useState(0);  //for triggering the use effect of res day list when adding a new appointment

 const [docid,setDocid]=useState(doctorid)
 //console.log(doctorid);

 const [filteredAppointments, setFilteredAppointments] = useState([]);

 useEffect(()=>
 {
  // console.log("Hello ",doctorid);
  // console.log("Hi day",selectedDay)
 },[])
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
        value={selectedTab}
        onChange={handleChanges}
        aria-label="example vertical tabs"
        sx={{marginTop:0}}
      >
         </Tabs>
              <div style={{width:'100%',marginTop:'2%'}}>
              {Array.isArray(doctorList) && doctorList.filter((item)=>{
                  return search.toLowerCase()===''?item:item.name.toLowerCase().includes(search.toLowerCase());
              }).map((item,index)=>(
                <div
                key={index}
                onClick={() => setSelectedTab(item.id)}
                style={{
                  backgroundColor: docid === item.id ? '#79CCBE' : 'transparent',
                   padding: '10px',
                   margin: '5px',
                  cursor: 'pointer',
                  borderRadius:'8px'
                }}
              >
                <Sideunit_Doctor selectedTab={docid} name={item.fullName} title={item.qualifications} index={item.id} key={index}></Sideunit_Doctor>
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
        }, p: 3, width: { xs:'100%',sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Grid sx={{paddingRight:'10px',paddingTop:{
          sm:'35px',
          xs:'30px'
        },width:'100%', height:'100%'}} item xs={9} sm={11} md={9}>
        {renderVal ?  <SearchPatientPage setAppCountUseEff={setAppCountUseEff} appCountUseEff={appCountUseEff} dayAppTotal={dayAppTotal} filteredAppointments={filteredAppointments} setFilteredAppointments={setFilteredAppointments} selectedDay={selectedDay} docid={doctorid} renderVal={renderVal} setRenderVal={setRenderVal}/> :<ResDayList setAppCountUseEff={setAppCountUseEff} appCountUseEff={appCountUseEff} dayAppTotal={dayAppTotal} setDayAppTotal={setDayAppTotal} filteredAppointments={filteredAppointments} setFilteredAppointments={setFilteredAppointments} selectedDay={selectedDay}  docid={doctorid}  renderVal={renderVal} setRenderVal={setRenderVal}/>}   
          </Grid>        
      </Box>
    </Box>
   
  );
}



export default ResDay;
