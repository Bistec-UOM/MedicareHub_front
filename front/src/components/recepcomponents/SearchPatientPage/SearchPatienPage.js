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
import { setHeaders } from "../../../Services/Auth";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Typography } from "@mui/material";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

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
  const [RloadDone, setRloadDone] = useState(false); //state for patientList loading
  const [unableTimeSlots, setUnableTimeSlots] = useState([]); //var for fetching unable date's time slots

  var location = useLocation();
  var loc = location.state;
  var doctorId = props.docid;
  //----popover----//
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //--------popover------//



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
        const response = await fetch(
          baseURL + endPoints.PatientList,
          setHeaders()
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setPatientList(responseData);
        setRloadDone(true);
      } catch (err) {
        if (err.hasOwnProperty("response")) {
          handleNotification("Network Error Occured!", "error");
          setRloadDone(true);
        } else {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [patientCount]);

  //use effect for fetching the unavailable time slots
  useEffect(() => {
    const reqDate = new Date(props.selectedDay);
    const formattedReqDate = `${reqDate.getFullYear()}-${(
      reqDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${reqDate
      .getDate()
      .toString()
      .padStart(2, "0")}T${reqDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${reqDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${reqDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${reqDate
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    const fetchData = async () => {
      try {
        const response = await fetch(
          baseURL +
            endPoints.UnableTimeSlots +
            `${doctorId}` +
            "/date/" +
            `${formattedReqDate}`,
          setHeaders()
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setUnableTimeSlots(responseData);
        console.log("untime", responseData);
      } catch (err) {
        if (err.hasOwnProperty("response")) {
          handleNotification("Network Error occured", "error");
          setRloadDone(true);
        } else {
          console.log(err);
        }
      }
    };
    fetchData();
  }, []);

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
          paddingTop: { xs: "7px", sm: "10px",md:'20px' },
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
        <Typography
          variant="h5"
          sx={{ color: "#d0d1cb", marginBottom: { md: "0px", xs: "5%" } }}
        >
          {props.selectedDay}
        </Typography>
        <Stack
          sx={{
            justifyContent: "flex-end",
            marginBottom: 3,
            width: { xs: "100%", sm: "auto" },
            marginRight: { xs: "0", sm: "5%", md: "5%" },
            marginTop: {
              md: 0,
              xs: "3%",
            },
          }}
          spacing={2}
          direction="row"
        >
          <Button
            onClick={handleRegOpen}
            sx={{
              fontWeight: 25,
            }}
            variant="contained"
            endIcon={<AddIcon></AddIcon>}
          >
            New
          </Button>
          <Button
            onClick={handleBackToList}
            // disabled={isDisabled}
            sx={{
              fontWeight: 25,
              whiteSpace: "nowrap",
            }}
            color="warning"
            variant="outlined"
            startIcon={
              <ArrowBackIosNewIcon
                sx={{ display: { md: "flex", xs: "none" } }}
              ></ArrowBackIosNewIcon>
            }
          >
            Back To List
          </Button>
          <Button
            sx={{
              fontWeight: 25,
              whiteSpace: "nowrap",
            }}
            color="warning"
            endIcon={
              <AppBlockingIcon
                sx={{ display: { md: "flex", xs: "none" } }}
              ></AppBlockingIcon>
            }
            variant="outlined"
            onClick={handleClick}
          >
            Unavailable
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "260px" } }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  margin: "8px",
                  paddingBottom: "5px",
                  borderBottom: "1px solid lightgrey",
                }}
              >
                <AppBlockingIcon
                  color="warning"
                  sx={{ mr: "10px" }}
                ></AppBlockingIcon>
                <Typography>Unavailable Time Slots</Typography>
              </div>
            </Box>
            {unableTimeSlots.map((day, index) => (
        <ListItem key={index} sx={{ textAlign: 'center', justifyContent: 'center' }}>
          <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px' }}>
            <CircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ textAlign: 'center' }}>
                {day.startTime.slice(11, 16)} - {day.endTime.slice(11, 16)}
              </Box>
            }
          />
        </ListItem>
      ))}
          </Popover>
        </Stack>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxHeight: "75vh",
          paddingTop: "110px",
         
        }}
      >
        {
          <Box sx={{ width: "80%", marginTop: { xs: "20%", sm: "0%" } }}>
            {!RloadDone ? <Load></Load> : ""}
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
