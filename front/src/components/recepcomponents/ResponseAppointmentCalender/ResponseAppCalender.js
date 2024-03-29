  import * as React from 'react';
  import Box from '@mui/material/Box';
  import CssBaseline from '@mui/material/CssBaseline';
  import Divider from '@mui/material/Divider';
  import Drawer from '@mui/material/Drawer';
  import Toolbar from '@mui/material/Toolbar';
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

    const [doctorList,setDoctorList]=useState([]);  //doctor list of sidebar
    const [doctorCount,setDoctorCount]=useState(1);  

    useEffect(()=>
    {
      fetch("https://localhost:7205/api/Appointment/doctors").then((response)=>
      {
        return response.json();
      }).then((responseData)=>
      {
        setDoctorCount(doctorCount+1);
       // console.log("in response calender",responseData.result);
        setDoctorList(responseData.result);
        setSelectedTab(responseData.result[0].id)  //set the selected doctor id
      })
    },[]);
     const handleChanges = (event, newValue) => {
      setSelectedTab(newValue);
    };

    const [mobileOpen, setMobileOpen] = React.useState(false);  //variable for mobile screen drawer open
    const [isClosing, setIsClosing] = React.useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
   

  const [search,setSearch]=useState("")  //searching text var of searchbar of doctors
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <Grid  item xs={3} sm={1} md={3} sx={{backgroundColor:'#DEF4F2'}}>   
            <SidebarContainer>
              <SidebarTop>
                <SearchBar  search={search} setSearch={setSearch} mgl="10%" isDisabled={false} placename="Doctor name"></SearchBar>
              </SidebarTop>
              <SidebarList sx={{backgroundColor:'#DEF4F2'}}>   
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
