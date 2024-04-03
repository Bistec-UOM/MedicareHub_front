import React from "react";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import { useState } from "react";
import Calender from "../Calender/MyCalender";
import MyCalendar from "../Calender/MyCalender";
import { SidebarContainer, SidebarTop,SidebarList } from "../../sidebar/Sidebar";
import { useEffect } from "react";

import { Sideunit_Doctor } from "../../sidebar/Sideunits";
import SearchBar from "../Searchbar/Searchbar";
import {Tabs,Tab} from "@mui/material";
import '../../../recep.css'

const AppointmentCalender = () => {
  useEffect(()=>{
    document.body.style.margin = '0';
   },[])
    const [appointmentlist,setAppointmentList]=useState([])
    const data=[
      {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
      {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
      {'name':'Tharushi Fernando','title':'MBBS, MD'},
      {'name':'Infas Mohomad','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'}
      
   ] 
   const [search,setSearch]=useState("")

   const [selectedTab, setSelectedTab] = useState(0);
 //  const [doctorid,setDoctorid]=useState(null)


   const handleChange = (event, newValue) => {
     setSelectedTab(newValue);
   };
  
   // const []
  return (
  
      
        <Grid sx={{paddingTop:'64px',height:'100vh'}} container direction="row">
          <Grid item xs={3} sm={2} md={3}>
           <SidebarContainer>
            <SidebarTop>
              <SearchBar search={search} setSearch={setSearch} mgl="10%" isDisabled={false} placename="Doctor name or id..."></SearchBar>
            </SidebarTop>
            <SidebarList>
            <Tabs
        orientation="vertical"
       // variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        aria-label="example vertical tabs"
        sx={{marginTop:0}}
        
      >
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

<Grid sx={{paddingLeft:'10px',paddingRight:'10px'}} item xs={9} sm={10} md={9}>
           <MyCalendar doctorId={selectedTab}/>
          </Grid>
        </Grid>
     
 
  );
};

export default AppointmentCalender;
