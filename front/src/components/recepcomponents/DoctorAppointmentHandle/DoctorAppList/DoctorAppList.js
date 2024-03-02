import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Stack, Typography, Button, Container, Box, Hidden } from "@mui/material";

import AppointmentCard from "../../AppointmentCard/AppointmentCard";
import SearchBar from "../../Searchbar/Searchbar";
import Steper from "../../Setper/Steper";
import { SidebarContainer } from "../../../sidebar/Sidebar";
import { SidebarTop, SidebarList } from "../../../sidebar/Sidebar";
import { Sideunit_Doctor } from "../../../sidebar/Sideunits";


import AppAddPopup from "../../AppAddPopup/AppAddPopup";
import AllAppDeletePopup from "../../AllAppDeletePopup/AllAppDeletePopup";
import '../../../../recep.css'
import SuccessNotification from "../../SnackBar/SuccessNotification";
import axios from "axios";
import DoctorAppCard from "../DoctorAppCard/DoctorAppCard";
import DoctorAllAppDeletePopup from "../DoctotAllAppDelelePopup/DoctorAllAppDeletePopup";







const DoctorAppList = (props) => {

  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");

  const handleNotification=(msg)=>
 {
     //console.log(msg)
     setNotiMessage(msg);
    setNotificationOpen(true);
    console.log(notiMessage);
   
    
 }



  const [dayapp, setDayApp] = useState([]);
  const [doctorid,setDoctorid]=useState(props.docid);
 
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search,setSearch]=useState("")

  const [apopen, setApopen] = useState(false);
  const [dopen, setDopen] = useState(false);

  const [delcount,setDelcount]=useState(0)

  const [isDisabled, setIsDisabled] = useState(true);

  const [selectedDay,setSelectedDay]=useState(props.selectedDay);

  const [patientDataList,setPatientDataList]=useState([]);

  const [cancelAll,setCancelAll]=useState(false);

  const handleCancelAll = () => {
    setCancelAll(true);
  };

  var location = useLocation();
  var loc = location.state;

  const handleAppAd = () => {
   // setApopen(true);
    props.setRenderVal(true);
  };
  useEffect(() => {
    console.log("use effect doctorid", props.doctorId);
    console.log("use effect selected", selectedDay);
    document.body.style.margin = "0";

    axios.get(`https://localhost:7205/api/Appointment/doctor/${props.docid}/day/${selectedDay}`)
        .then((response) => {
             console.log("do",props.docid);
            // console.log(selectedDay);
            // console.log("pure",response);
            console.log("response data",response.data)
            const responseData = response.data;
           // setFilteredAppointments(responseData);
            setIsDisabled(responseData.length === 0); // Update isDisabled based on the fetched appointments
            console.log("use effect appointments", responseData.result);
            const sortedAppointments = responseData.slice().sort((a, b) => new Date(a.appointment.dateTime) - new Date(b.appointment.dateTime));  //this is used for sorting appointments based on their arrival time
            setFilteredAppointments(sortedAppointments);
            console.log("sorted appointments",sortedAppointments)
        })
        .catch((error) => {
            console.error('Error fetching appointments:', error);
        });
  

}, [props.docid, selectedDay, delcount]); // Ensure dependencies are included in the dependency array

  return (
    
    <Box sx={{height:'100%'}}>
      <Box 
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          position:'fixed',
          backgroundColor:'white',
          width:{sm:'70%',xs:'90%'},
          flexWrap:'wrap-reverse',
          paddingTop:{xs:'7px',sm:'10px'},
          zIndex:10
          
         // paddingTop:10,
          //marginLeft:-10
        }}
      >
        <SearchBar 
          search={search}
          setSearch={setSearch}
          mgl="20%"
          isDisabled={isDisabled}
          placename="Patient name or id..."
        />
        <Stack
          sx={{
            justifyContent: "flex-end",
            marginBottom: 3,
            marginRight: {
                md:3,
                sm:5,
                xs:-3
            },
            width:{xs:'100%',sm:'auto'}
          }}
          spacing={2}
          direction="row"
        >
          {/* <Button
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
          </Button> */}
          <Button
            onClick={handleCancelAll}
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
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxHeight: "75vh",
         
        }}
      >
        <Box sx={{ padding:{
            sm: "3% 0 0 8%",
            xs:"5% 0 0 2%",
            

        },display:{xs:'none',sm:'none',md:'flex'},marginRight:{xs:'3%',sm:'0%'},marginTop:{xs:'50%',sm:'20%',md:'7%'} }}>
          <Steper  search={search} items={filteredAppointments}></Steper>
        </Box>

        {
          <Box sx={{ width: "80%",marginTop:{xs:'40%',sm:'20%',md:'7%'}}}>
            {Array.isArray(filteredAppointments) && filteredAppointments.sort((a,b)=>{
              return new Date(a.time)-new Date(b.time);
            })
            .filter((item)=>{
              return search.toLowerCase()===''?item:item.patient.fullName.toLowerCase().includes(search.toLowerCase())
            }).map((item) => (
              <div key={item.nic}>
                <DoctorAppCard  
                selectedDay={selectedDay}
                  docid={props.docid}
                  appointlist={props.appointlist}
                  setAppointList={props.setAppointList}
                  handleNotification={handleNotification}
                  delcount={delcount}
                  setDelcount={setDelcount}
                  filteredAppointments={filteredAppointments}
                  setFilteredAppointments={setFilteredAppointments}
                  item={item}
                />
              </div>
            ))}
          </Box>
        }
      </div>
      <AppAddPopup apopen={apopen} setApopen={setApopen} />
      <DoctorAllAppDeletePopup
        selectedDay={selectedDay}
        delcount={delcount}
        setDelcount={setDelcount}
        docid={props.docid}
        handleNotification={handleNotification}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        filteredAppointments={filteredAppointments}
        setFilteredAppointments={setFilteredAppointments}
        cancelAll={cancelAll}
        setCancelAll={setCancelAll}
      />
       <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen}/>
    
    </Box>
  );
};

export default DoctorAppList;
