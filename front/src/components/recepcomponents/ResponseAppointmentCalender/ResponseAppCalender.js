  import * as React from 'react';


  import Box from '@mui/material/Box';
  import CssBaseline from '@mui/material/CssBaseline';
  import Divider from '@mui/material/Divider';
  import Drawer from '@mui/material/Drawer';
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
import MyFullCalendar from '../MyFullCalendar/MyFullCalendar';

  const drawerWidth = 358.4;

  function ResponseAppCalender() {
    useEffect(()=>{
      document.body.style.margin = '0';
    },[])

    const [doctorList,setDoctorList]=useState([]);
    const [doctorCount,setDoctorCount]=useState(1);

    useEffect(()=>
    {
      fetch("https://localhost:7205/api/Appointment/doctors").then((response)=>
      {
        return response.json();
      }).then((responseData)=>
      {
        setDoctorCount(doctorCount+1);
        console.log("in response calender",responseData.result);
        //console.log
        setDoctorList(responseData.result);
        setSelectedTab(responseData.result[0].id)

      })

    },[]);
    

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

    


  //   const data=[
  //     {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
  //     {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
  //     {'name':'Tharushi Fernando','title':'MBBS, MD'},
  //     {'name':'Infas Mohomad','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'},
  //     {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
  //     {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
  //     {'name':'Tharushi Fernando','title':'MBBS, MD'},
  //     {'name':'Ankmal saruken','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'}
      
      
    
  //  ] 
  const [search,setSearch]=useState("")

    const drawer = (
      <div>

        <Toolbar />
        <Divider />
        <Grid  item xs={3} sm={1} md={3} sx={{backgroundColor:'#DEF4F2'}}>
            <SidebarContainer>
              <SidebarTop>
                <SearchBar search={search} setSearch={setSearch} mgl="10%" isDisabled={false} placename="Doctor name"></SearchBar>
              </SidebarTop>
              <SidebarList sx={{backgroundColor:'#DEF4F2'}}>
                
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
                  {Array.isArray(doctorList) && doctorList.filter((item)=>{
                      return search.toLowerCase()===''?item:item.name.toLowerCase().includes(search.toLowerCase());
                  }).map((item,index)=>(
                    <div
                    key={index}
                    onClick={() => setSelectedTab(item.id)}
                    style={{
                      backgroundColor: selectedTab === item.id? '#79CCBE' : 'transparent',
                      color:selectedTab === item.id? 'white' : 'black',
                      padding: '10px',
                      margin: '5px',
                      cursor: 'pointer',
                      borderRadius:'8px'
                    }}
                  >
                    <Sideunit_Doctor selectedTab={selectedTab}  name={item.fullName} title={item.qualifications} index={item.id} key={selectedTab}></Sideunit_Doctor>
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
    
      <Box sx={{ display: 'flex' ,height:'100%'}}>
        <CssBaseline />
        <ResNavBar isClosing={isClosing} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth },  flexShrink: { sm: 0 } }}
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
            
              height:'100%'

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
          }, p: 3, width: {  sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        
          
          <Grid sx={{paddingLeft:'10px',paddingRight:'10px',paddingTop:'64px',width:'100%', height:'100%'}} item xs={9} sm={11} md={9}>
            <MyFullCalendar doctorId={selectedTab}/>
            </Grid>
          
        </Box>
      </Box>
    
    );
  }



  export default ResponseAppCalender;
