import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Stack, Typography, Button, Container, Box } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SearchBar from "../Searchbar/Searchbar";
import Steper from "../Setper/Steper";
import { SidebarContainer } from "../../sidebar/Sidebar";
import { SidebarTop, SidebarList } from "../../sidebar/Sidebar";
import { Sideunit_Doctor } from "../../sidebar/Sideunits";

import SuccessNotification from "../SnackBar/SuccessNotification";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import AppAddPopup from "../AppAddPopup/AppAddPopup";
import AllAppDeletePopup from "../AllAppDeletePopup/AllAppDeletePopup";
import DayAppList from "../DayAppList/DayAppList";
import PatientDetailCard from "../PatientDetailCard/PatientDetailCard";
import PatientRegpopup from "../PatRegPopup/PatientRegPopup";
import '../../../recep.css'


const SearchPatientPage = (props) => {

  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notiMessage,setNotiMessage]=useState("");

  const [patientCount,setPatientCount]=useState(0); //use for patient rendering useffect


  const [search,setSearch]=useState("")
  const [dayapp, setDayApp] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [appAddPopupCount,setAppAddPopupCount]=useState(0);

  const [apopen, setApopen] = useState(false);
  const [dopen, setDopen] = useState(false);

  const [regopen,setRegopen]=useState(false);



 const handleNotification=(msg)=>
 {
     //console.log(msg)
     setNotiMessage(msg);
    setNotificationOpen(true);
    console.log(notiMessage);
   
    
 }

  const handleBackToList = () => {
    props.setRenderVal(false);
  };

  const handleRegOpen=()=>
  {
    setRegopen(true);
  }

  useEffect(()=>
  {
   fetch(`https://localhost:7205/api/Appointment/patients`).then((response)=>
   {
     return response.json();
   }).then((responseData)=>
   {
     console.log("Hello docid",props.docid)
     console.log(responseData);
     console.log("insied searchpa",props.selectedDay)
     setPatientList(responseData);

   })

  },[patientCount]);

  const [patientList,setPatientList] = useState(null);

  const handleDeleteAll = () => {
    setDopen(true);
  };

  const [activeId, setActiveId] = useState("");
  

 

//  console.log(activeData[0] && activeData[0].name )
  

  var location = useLocation();
  var loc = location.state;

  const handleAppAd = () => {
    // setApopen(true);
    props.setRenderVal(true);
  };

  return (
  
    <Box sx={{height:'100%'}} >
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
          
        
       

          // flexDirection:{
          //   xs:'column',
          //   sm:'row'
          // },
             //bgcolor:'red'
      
         
        }}
      >
        <SearchBar
          search={search}
          setSearch={setSearch}
          mgl="20%"
          isDisabled={false}
          placename="Patient name or id..."
        />
        <Stack
          sx={{
            justifyContent: "flex-end",
            marginBottom: 3,
           // bgcolor:'blue',
            width:{xs:'100%',sm:'auto'},
            marginRight:{xs:'0',sm:'5%',md:'5%'}
           
          }}
          spacing={2}
          direction="row"
        >
          <Button
            onClick={handleRegOpen}
            sx={{
              backgroundColor: "#79CCBE",
              fontWeight: 25,
              "&:hover": {
                backgroundColor: "#79CCBE", // Set hover background color to be the same
              },
            }}
            variant="contained"
          >
            New
          </Button>
          <Button
            onClick={handleBackToList}
            // disabled={isDisabled}
            sx={{
              backgroundColor: "#F44336",
              fontWeight: 25,
               whiteSpace: "nowrap",
              
              "&:hover": {
                backgroundColor: "#F34436", // Set hover background color to be the same
              },
            }}
            variant="contained"
          >
            Back To List
          </Button>
        </Stack>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxHeight: "75vh",
          paddingTop:'80px'
         
        }}
      >
        {
          <Box sx={{ width: "80%" ,marginTop:{xs:'20%',sm:'0%'}}}>
            {Array.isArray(patientList) && patientList.filter((item)=>{
              return search.toLowerCase() ===''?item:item.fullName.toLowerCase().includes(search.toLowerCase());
            }).map((item) => (
              <div key={item.nic+item.fullName}>
                <PatientDetailCard
                appAddPopupCount={appAddPopupCount}
                  setAppAddPopupCount={setAppAddPopupCount}
                  setActiveId={setActiveId}
                  apopen={apopen}
                  setApopen={setApopen}
                  item={item}
                />
              </div>
            ))}
          </Box>
        }
        <AppAddPopup selectedDay={props.selectedDay} handleNotification={handleNotification} docid={props.docid} appointmentList={props.appointlist} setAppointmentList={props.setAppointmentList} appAddPopupCount={appAddPopupCount} setAppAddPopupCount={setAppAddPopupCount} patientList={patientList} activeId={activeId} apopen={apopen} setApopen={setApopen} />
        <PatientRegpopup patientCount={patientCount} setPatientCount={setPatientCount} handleNotification={handleNotification} patientList={patientList} setPatientList={setPatientList} regopen={regopen} setRegopen={setRegopen}></PatientRegpopup>
      </div>
      <SuccessNotification setNotificationOpen={setNotificationOpen} notiMessage={notiMessage} notificationOpen={notificationOpen}/>
    
    </Box>
   
  );
};

export default SearchPatientPage;
