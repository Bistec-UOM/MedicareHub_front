import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Button, Container, Box } from "@mui/material";
import SearchBar from "../Searchbar/Searchbar";
import SuccessNotification from "../SnackBar/SuccessNotification";
import AppAddPopup from "../AppAddPopup/AppAddPopup";
import PatientDetailCard from "../PatientDetailCard/PatientDetailCard";
import PatientRegpopup from "../PatRegPopup/PatientRegPopup";
import { Load } from "../../Other";
import "../../../recep.css";
import { baseURL, endPoints } from "../../../Services/Appointment";

const SearchPatientPage = (props) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [notiType, setNotiType] = useState("success");
  const [patientCount, setPatientCount] = useState(0); //use for patient rendering useffect
  const [search, setSearch] = useState("");
  const [appAddPopupCount, setAppAddPopupCount] = useState(0);
  const [apopen, setApopen] = useState(false); //bool variable for open app add popup
  const [regopen, setRegopen] = useState(false); //bool variable for open patient reg popup open
  const [patientList, setPatientList] = useState(null);
  const [activeId, setActiveId] = useState(""); //var for selected patient id
  const [RloadDone,setRloadDone]=useState(false)  //state for patientList loading 

  var location = useLocation();
  var loc = location.state;

  const handleNotification = (msg, type) => {
    setNotiMessage(msg);
    setNotificationOpen(true);
    setNotiType(type);
  };
  const handleBackToList = () => {
    props.setRenderVal(false);
  };

  const handleRegOpen = () => {
    setRegopen(true);
  };


  //fetching the patient list
  useEffect(() => {
    const fetchData = async () => {
      try {
       // const response = await fetch(`https://localhost:7205/api/Appointment/patients`);
        const response = await fetch(baseURL+endPoints.PatientList);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setPatientList(responseData);
        setRloadDone(true);
      } catch (err) {
        if(err.hasOwnProperty('response'))
        {
          handleNotification(err.response.data,"error");
          setRloadDone(true); 
        }
        else{
          console.log(err);
        }
         
      }
    };
  
    fetchData();
  }, [patientCount]);
  
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          position: "fixed",
          backgroundColor: "white",
          width: { sm: "70%", xs: "90%" },
          flexWrap: "wrap-reverse",
          paddingTop: { xs: "7px", sm: "10px" },
          zIndex: 10,
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
            width: { xs: "100%", sm: "auto" },
            marginRight: { xs: "0", sm: "5%", md: "5%" },
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
          paddingTop: "80px",
        }}
      >
        {
          <Box sx={{ width: "80%", marginTop: { xs: "20%", sm: "0%" } }}>
                      {!RloadDone?<Load></Load>:''}
            {Array.isArray(patientList) &&
              patientList
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.fullName
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .map((item) => (
                  <div key={item.nic + item.fullName}>
                    <PatientDetailCard
                      appAddPopupCount={appAddPopupCount}
                      setAppAddPopupCount={setAppAddPopupCount}
                      setActiveId={setActiveId}
                      apopen={apopen}
                      setApopen={setApopen}
                      item={item}
                      filteredAppointments={props.filteredAppointments}
                      docid={props.docid}
                      handleNotification={handleNotification}
                    />
                  </div>
                ))}
          </Box>
        }
        <AppAddPopup
          dayAppTotal={props.dayAppTotal}
          setDayAppTotal={props.setDayAppTotal}
          filteredAppointments={props.filteredAppointments}
          setFilteredAppointments={props.setFilteredAppointments}
          selectedDay={props.selectedDay}
          handleNotification={handleNotification}
          docid={props.docid}
          appointmentList={props.appointlist}
          setAppointmentList={props.setAppointmentList}
          appAddPopupCount={appAddPopupCount}
          setAppAddPopupCount={setAppAddPopupCount}
          patientList={patientList}
          activeId={activeId}
          apopen={apopen}
          setApopen={setApopen}
        />
        <PatientRegpopup
          patientCount={patientCount}
          setPatientCount={setPatientCount}
          handleNotification={handleNotification}
          patientList={patientList}
          setPatientList={setPatientList}
          regopen={regopen}
          setRegopen={setRegopen}
        ></PatientRegpopup>
      </div>
      <SuccessNotification
        type={notiType}
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
      />
    </Box>
  );
};

export default SearchPatientPage;
