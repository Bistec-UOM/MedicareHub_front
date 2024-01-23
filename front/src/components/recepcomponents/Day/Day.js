import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SearchBar from "../Searchbar/Searchbar";
import Steper from "../Setper/Steper";
import { SidebarContainer } from "../../sidebar/Sidebar";
import { SidebarTop,SidebarList } from "../../sidebar/Sidebar";
import { Sideunit_Doctor } from "../../sidebar/Sideunits";
import { CustomScroll } from "../../CustomScroll";
import AppAddPopup from "../AppAddPopup/AppAddPopup";
import AllAppDeletePopup from "../AllAppDeletePopup/AllAppDeletePopup";
import DayList from "../DayAppList/DayAppList";
import SearchPatientPage from "../SearchPatientPage/SearchPatienPage";

const Day = () => {
  const [renderVal,setRenderVal]=useState(false);
  
  

 
 

  const [appointlist,setAppointList]=useState([
    {
      name:'kamal',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'21433454325',
      phone:'0774733245',
      time:'8.30 AM'
      

    },
    {
      name:'akila',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'4524523',
      phone:'0774733245',
      time:'9.00 AM'
      

    },
    {
      name:'namal',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'452452343',
      phone:'0774733245',
      time:'9.30 AM'
      

    },
    {
      name:'sachith',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'4524543223',
      phone:'0774733245',
      time:'10.00 AM'
      

    },
    {
      name:'vihanga',
      city:'Colombo',
      today:'January 4, 2024',
      nic:'45244332523',
      phone:'0774733245',
      time:'10.30 AM'
      

    },
    {
      name:'ranil',
      city:'Moratuwa',
      today:'January 4, 2024',
      nic:'54325324',
      phone:'0742314567',
      time:'11.00 AM'
      

    },
    {
      name:'saman',
      city:'kandy',
      today:'January 5, 2024',
      nic:'54243252',
      phone:'0774733245',
      time:'9.30 AM'

    },

    {
      name:'nipun',
      city:'galle',
      today:'January 6, 2024',
      nic:'5243525',
      phone:'0774733245',
      time:'9.30 AM'
    }
  ]);

  const data=[
    {'name':'Amal Rathnayaka','title':'MBBS, MD, MRCP(UK)'},
    {'name':'Bimasara Herath','title':'MBBS, MD, MRCP(UK), PRCP-E'},
    {'name':'Tharushi Fernando','title':'MBBS, MD'},
    {'name':'Infas Mohomad','title':'MBBS, FCGP(SL), MD-CH(UK), MBS-CH(UK), C.ht(USA)'}
 ] 

 
  return (
    <CustomScroll>
      <Navbar />
      
        <Grid sx={{paddingTop:'64px',height:'100vh'}} container direction="row">
          <Grid item md={3}>
          <SidebarContainer>
            <SidebarTop>
              <SearchBar  isDisabled={false} placename="Doctor name or id..." mgl="10%"></SearchBar>
            </SidebarTop>
            <SidebarList>
              {data.map((item,index)=>(
                <Sideunit_Doctor name={item.name} title={item.title} key={index}></Sideunit_Doctor>
              ))}
               
            </SidebarList>
           </SidebarContainer>
          </Grid>
          <Grid  item  md={9}>
          {renderVal ?  <SearchPatientPage renderVal={renderVal} setRenderVal={setRenderVal}/> :<DayList appointlist={appointlist} renderVal={renderVal} setRenderVal={setRenderVal}/>}
          </Grid>

          {/* <Grid  item  md={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItem: "center",
              }}
            >
              <SearchBar mgl="10%" isDisabled={isDisabled} placename="Patient name or id..."/>

              <Stack
                sx={{
                  justifyContent: "flex-end",
                  marginBottom: 3,
                  marginRight: 3,
                }}
                spacing={2}
                direction="row"
              >
                <Button
                  onClick={handleAppAd}
                  sx={{
                    backgroundColor: "#79CCBE",
                    fontWeight: 25,
                    "&:hover": {
                      backgroundColor: "#79CCBE", // Set hover background color to be the same
                    },
                  }}
                  variant="contained"
                >
                  Add
                </Button>
                <Button
                  onClick={handleDeleteAll}
                  disabled={isDisabled}
                  sx={{
                    backgroundColor: "#F44336",
                    fontWeight: 25,
                    "&:hover": {
                      backgroundColor: "#F34436", // Set hover background color to be the same
                    },
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%",maxHeight:'75vh' ,overflowY:'scroll'}}
            >
                <Box sx={{padding:"3% 0 0 8%"}}>
                    <Steper  items={filteredAppointments}></Steper>
                </Box>
              

              { <div style={{ width: "80%" }}>
                {filteredAppointments.map((item) => (
                  <div key={item.nic}>
                    <AppointmentCard filteredAppointments={filteredAppointments} setFilteredAppointments={setFilteredAppointments} item={item} />
                  </div>
                ))}
              </div> }
            </div>
            <AppAddPopup apopen={apopen} setApopen={setApopen}/>
            <AllAppDeletePopup isDisabled={isDisabled} setIsDisabled={setIsDisabled} filteredAppointments={filteredAppointments} setFilteredAppointments={setFilteredAppointments}  dopen={dopen} setDopen={setDopen}/>
          </Grid> */}
        </Grid>
      
    </CustomScroll>
  );

  // return <div>
  //    {
  //     dayapp.map((item)=>(
  //         <div>

  //              <h1 key={item.name}>{item.name}-{item.city}</h1>

  //         </div>

  //     ))

  //    }
  // </div>
};

export default Day;
