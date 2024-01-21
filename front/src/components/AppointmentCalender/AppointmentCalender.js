import React from "react";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import { useState } from "react";
import Calender from "../Calender/MyCalender";
import MyCalendar from "../Calender/MyCalender";
import { SidebarContainer, SidebarTop,SidebarList } from "../sidebar/Sidebar";
import { useEffect } from "react";
import { CustomScroll } from "../CustomScroll";
import { Sideunit_Doctor } from "../sidebar/Sideunits";
import SearchBar from "../Searchbar/Searchbar";

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
  
   // const []
  return (
    <CustomScroll>
      
        <Grid sx={{paddingTop:'64px',height:'100vh'}} container direction="row">
          <Grid item md={3}>
           <SidebarContainer>
            <SidebarTop>
              <SearchBar isDisabled={false} placename="Doctor name or id..."></SearchBar>
            </SidebarTop>
            <SidebarList>
              {data.map((item,index)=>(
                <Sideunit_Doctor name={item.name} title={item.title} key={index}></Sideunit_Doctor>
              ))}
               
            </SidebarList>
           </SidebarContainer>
          </Grid>

          <Grid sx={{paddingLeft:'10px',paddingRight:'10px'}} item md={9}>
           <MyCalendar/>
          </Grid>
        </Grid>
     
    </CustomScroll>
  );
};

export default AppointmentCalender;
