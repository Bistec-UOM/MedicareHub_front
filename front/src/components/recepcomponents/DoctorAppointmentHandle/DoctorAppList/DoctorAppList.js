import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Stack,
  Typography,
  Button,
  Container,
  Box,
  Hidden,
} from "@mui/material";
import SearchBar from "../../Searchbar/Searchbar";
import StepDoctor from "../SetperDoctor/SteperDoctor";
import "../../../../recep.css";
import SuccessNotification from "../../SnackBar/SuccessNotification";
import axios from "axios";
import DoctorAppCard from "../DoctorAppCard/DoctorAppCard";
import DoctorAllAppDeletePopup from "../DoctotAllAppDelelePopup/DoctorAllAppDeletePopup";
import DayBlockPopup from "../DayBlockPopup/DayBlockPopup";
import { Load } from "../../../Other";
import { baseURL,endPoints } from "../../../../Services/Appointment";
import BlockSelectionPopup from "../BlockSelectionPopup/BlockSelectionPopup";
import BlockTimeSelectionPopup from "../BlockTimeSelectionPopup/BlockTImeSelectionPopup";
import { setHeaders } from "../../../../Services/Auth";
import * as signalR from '@microsoft/signalr';
import { jwtDecode } from "jwt-decode";


const DoctorAppList = (props) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [notiType, setNotiType] = useState("success");
  const [blockSelectionPopup, setBlockSelectionPopup] = useState(false); //var for doc blockSelection  block popup
  const [docDayBlockPopup, setDocDayBlockPopup] = useState(false); //var for doc day  block popup
  const [RloadDone,setRloadDone]=useState(false)  //state for doctorapplist loading 


  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {

  //   let userId = jwtDecode(localStorage.getItem("medicareHubToken")).Id;

   
  //   // Create a connection to the SignalR hub
  //   const newConnection = new signalR.HubConnectionBuilder()
  //     .withUrl(`https://localhost:7205/appointmentnotificationHub?userId=${userId}`) // Ensure this matches the hub URL in your Startup.cs
  //     .withAutomaticReconnect()
  //     .build();

  //   // Set up the connection
  //   setConnection(newConnection);
  // }, []);

  // useEffect(() => {
  //   console.log("before con");
  //   if (connection) {
  //     // Start the connection
  //     connection.start()
  //       .then(result => {
  //         console.log('Connected! helo');

  //         // Set up a listener for notifications
  //         connection.on('ReceiveNotification', message => {
  //           console.log("inside receive notification");
  //           setMessages(messages => [...messages, message]);
  //           console.log("mesage",message);
  //         });
  //       })
  //       .catch(e => console.log('Connection failed: ', e));
  //   }
  // }, [connection]);

  const handleNotification = (msg, type) => {
    setNotiMessage(msg);
    setNotificationOpen(true);
    setNotiType(type);
  };

  const [filteredAppointments, setFilteredAppointments] = useState([]); //for storing fetched appointments
  const [search, setSearch] = useState("");
  const [delcount, setDelcount] = useState(0);
  const [isDisabledCancel, setIsDisabledCancel] = useState(true); //variable for disabling the cancel button
  const [isDisabledBlock, setIsDisabledBlock] = useState(true); //variable for disabling block button
  const [timeSelection,setTimeSelection]=useState(false);  //variable for time selection popup
  const [selectedDay, setSelectedDay] = useState(props.selectedDay);
  const [cancelAll, setCancelAll] = useState(false); //var for all app cancel popup
  const today = new Date();
  const compSelectedDay = new Date(selectedDay); //day object of selected day for comparison of blocking functionality

  const [notifications, setNotifications] = useState([]);

    // useEffect(() => {  //signal R connection use effect
    //     signalRConnection.on("ReceiveNotification", (message) => {
    //         setNotifications((prev) => [...prev, message]);
    //     });

    //     return () => {
    //         signalRConnection.off("ReceiveNotification");
    //     };
    // }, []);



  const handleCancelAll = () => {
    setCancelAll(true);
  };

  const handleBlockDay = () => {
    setBlockSelectionPopup(true);
  };

  var location = useLocation();
  var loc = location.state;

  useEffect(() => {
    //for fethcing the app of a day
    document.body.style.margin = "0";
    console.log("props",props.docid)
    console.log("messages",messages);

    axios
      .get(
        baseURL+endPoints.AppDay+`${props.docid}`+"/day/"+`${selectedDay}`,setHeaders()
      )
      .then((response) => {
        const responseData = response.data;
        setIsDisabledCancel(responseData.length === 0); // Update isDisabled based on the fetched appointments
        setIsDisabledBlock(responseData.length != 0 || today > compSelectedDay);
        const sortedAppointments = responseData
          .slice()
          .sort(
            (a, b) =>
              new Date(a.appointment.dateTime) -
              new Date(b.appointment.dateTime)
          ); //this is used for sorting appointments based on their arrival time
        setFilteredAppointments(sortedAppointments);
        setRloadDone(true);
      })
      .catch((err) => {
        handleNotification(err.response.data,"error");
        setRloadDone(true);
      });
  }, [props.docid, selectedDay, delcount]); // Ensure dependencies are included in the dependency array
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
          isDisabled={isDisabledCancel}
          placename="Patient name or id..."
        />
          <Typography variant="h5" sx={{ color: "#d0d1cb" }}>{selectedDay}</Typography>
        <Stack
          sx={{
            justifyContent: "flex-end",
            marginBottom: 3,
            marginRight: {
              md: 3,
              sm: 5,
              xs: -3,
            },
            width: { xs: "100%", sm: "auto" },
          }}
          spacing={2}
          direction="row"
        >
          <Button
            onClick={handleBlockDay}
            disabled={isDisabledBlock}
            sx={{
              backgroundColor: "#F44336",
              fontWeight: 25,
              "&:hover": {
                backgroundColor: "#F34436", // Set hover background color to be the same
              },
            }}
            variant="contained"
          >
            Block
          </Button>
          <Button
            onClick={handleCancelAll}
            disabled={isDisabledCancel}
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
        <Box
          sx={{
            padding: {
              sm: "3% 0 0 8%",
              xs: "5% 0 0 2%",
            },
            display: { xs: "none", sm: "none", md: "flex" },
            marginRight: { xs: "3%", sm: "0%" },
            marginTop: { xs: "50%", sm: "20%", md: "7%" },
          }}
        >
          <StepDoctor search={search} items={filteredAppointments}></StepDoctor>
        </Box>

        {
          <Box
            sx={{ width: "70%", marginTop: { xs: "40%", sm: "20%", md: "7%" } }}
          >
             {!RloadDone?<Load></Load>:''}
            {Array.isArray(filteredAppointments) &&
              filteredAppointments
                .sort((a, b) => {
                  return new Date(a.time) - new Date(b.time);
                })
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.patient.fullName
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .map((item) => (
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
      <DayBlockPopup
        selectedDay={selectedDay}
        doctorId={props.docid}
        docDayBlockPopup={docDayBlockPopup}
        setDocDayBlockPopup={setDocDayBlockPopup}
        handleNotification={handleNotification}
        blockSelectionPopup={blockSelectionPopup}
        setBlockSelectionPopup={setBlockSelectionPopup}
      />
       <BlockSelectionPopup
        timeSelection={timeSelection}
        setTimeSelection={setTimeSelection}
        selectedDay={selectedDay}
        doctorId={props.docid}
        docDayBlockPopup={docDayBlockPopup}
        setDocDayBlockPopup={setDocDayBlockPopup}
        blockSelectionPopup={blockSelectionPopup}
        setBlockSelectionPopup={setBlockSelectionPopup}
        handleNotification={handleNotification}
      />
      <BlockTimeSelectionPopup
        timeSelection={timeSelection}
        setTimeSelection={setTimeSelection}
        selectedDay={selectedDay}
        doctorId={props.docid}
        blockSelectionPopup={blockSelectionPopup}
        setBlockSelectionPopup={setBlockSelectionPopup}
        handleNotification={handleNotification}
      />
      <DoctorAllAppDeletePopup
        selectedDay={selectedDay}
        delcount={delcount}
        setDelcount={setDelcount}
        docid={props.docid}
        handleNotification={handleNotification}
        isDisabledCancel={isDisabledCancel}
        setIsDisabledCancel={setIsDisabledCancel}
        filteredAppointments={filteredAppointments}
        setFilteredAppointments={setFilteredAppointments}
        cancelAll={cancelAll}
        setCancelAll={setCancelAll}
      />
      <SuccessNotification
        type={notiType}
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
      />
    </Box>
  );
};

export default DoctorAppList;
