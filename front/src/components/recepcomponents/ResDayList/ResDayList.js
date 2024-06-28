import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Button, Box, Typography } from "@mui/material";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SearchBar from "../Searchbar/Searchbar";
import AllAppDeletePopup from "../AllAppDeletePopup/AllAppDeletePopup";
import "../../../recep.css";
import SuccessNotification from "../SnackBar/SuccessNotification";
import axios from "axios";
import { Load } from "../../Other";
import { baseURL, endPoints } from "../../../Services/Appointment";
import AddIcon from "@mui/icons-material/Add";
import { setHeaders } from "../../../Services/Auth";
import CloseIcon from "@mui/icons-material/Close";

//day app list page for a day

const ResDayList = (props) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [notiType, setNotiType] = useState("success");
  const [ePage, setEpage] = useState(false);
  const [RloadDone, setRloadDone] = useState(false); //state for applist loading
  const handleNotification = (msg, type) => {
    setNotiMessage(msg);
    setNotificationOpen(true);
    setNotiType(type);
  };
  const [addDisabled, setAddDisabled] = useState(false); //variable for Add button disabled
  const [search, setSearch] = useState("");
  const [dopen, setDopen] = useState(false); //var for all app delete popup
  const [delcount, setDelcount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true); //variable for all app cancel disability func
  const [selectedDay, setSelectedDay] = useState(props.selectedDay);

  const handleDeleteAll = () => {
    setDopen(true);
  };
  var location = useLocation();
  var loc = location.state;
  const handleAppAd = () => {
    props.setRenderVal(true);
  };

  //useeffect for fetching the app of a day of a selected doctor
  useEffect(() => {
    const tod = new Date(selectedDay); //selected day from date object
    var d = new Date();
    const dateWithoutTime = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    );
    if (tod < dateWithoutTime) {
      setAddDisabled(true);
    }

    document.body.style.margin = "0";
    axios
      .get(
        baseURL +
          endPoints.AppDay +
          `${props.docid}` +
          "/day/" +
          `${selectedDay}`,
        setHeaders()
      )
      .then((response) => {
        const responseData = response.data;
        setIsDisabled(responseData.length === 0 || tod < dateWithoutTime); // Update isDisabled based on the fetched appointments
        const sortedAppointments = responseData
          .slice()
          .sort(
            (a, b) =>
              new Date(a.appointment.dateTime) -
              new Date(b.appointment.dateTime)
          ); //this is used for sorting appointments based on their arrival time
        props.setFilteredAppointments(sortedAppointments);
        setRloadDone(true);
        props.setDayAppTotal(sortedAppointments.length);
        if (sortedAppointments.length >= 10) {
          //blocked more than 10 appointments for a day
          setAddDisabled(true);
        } else if (tod >= new Date() && sortedAppointments.lenght < 10) {
          setAddDisabled(false);
        }
      })
      .catch((error) => {
        handleNotification("Error fetching appointments:", "error");
        setEpage(true);
        setRloadDone(true);
      });
  }, [props.docid, selectedDay, delcount]); // Ensure dependencies are included in the dependency array

  return (
    <Box sx={{ height: "100%" }}>
      {console.log("props.filteredAppointments", props.filteredAppointments)}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          position: "fixed",
          backgroundColor: "white",
          width: { sm: "70%", xs: "90%" },
          flexWrap: "wrap-reverse",
          paddingTop: { xs: "7px", sm: "10px", md: "20px" },
          zIndex: 10,
        }}
      >
        <SearchBar
          id="appointmentsearch"
          search={search}
          setSearch={setSearch}
          // mgl="-120%"
          isDisabled={isDisabled}
          placename="Patient name or id..."
        />
        <Typography
          variant="h5"
          sx={{ color: "#d0d1cb", marginBottom: { md: "0px", xs: "5%" } }}
        >
          {selectedDay}
        </Typography>
        <Stack
          sx={{
            justifyContent: "flex-end",
            marginBottom: 3,
            marginRight: {
              md: 3,
              sm: 5,
              xs: -3,
            },
            marginTop: {
              md: 0,
              xs: "3%",
            },
            width: { xs: "100%", sm: "auto" },
          }}
          spacing={2}
          direction="row"
        >
          <Button
            data-testid="addbutton"
            endIcon={<AddIcon />}
            onClick={handleAppAd}
            disabled={addDisabled}
            variant="contained"
          >
            Add
          </Button>
          <Button
            data-testid="canceltest"
            onClick={handleDeleteAll}
            disabled={isDisabled}
            color="warning"
            variant="outlined"
            endIcon={<CloseIcon></CloseIcon>}
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
          {/* <Steper search={search} items={props.filteredAppointments}></Steper> */}
        </Box>
        {
          <Box
            data-testid="applist"
            sx={{ width: "70%", marginTop: { xs: "40%", sm: "20%", md: "7%" } }}
          >
            {!RloadDone ? <Load></Load> : ""}
            {Array.isArray(props.filteredAppointments) &&
              props.filteredAppointments
                .sort((a, b) => {
                  //compare time objects and sort and store
                  return new Date(a.time) - new Date(b.time);
                })
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.patient.fullName
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .map((item, index) => (
                  <div key={item?.id}>
                    <AppointmentCard
                      appno={index}
                      selectedDay={selectedDay}
                      docid={props.docid}
                      appointlist={props.appointlist}
                      setAppointList={props.setAppointList}
                      handleNotification={handleNotification}
                      delcount={delcount}
                      setDelcount={setDelcount}
                      filteredAppointments={props.filteredAppointments}
                      setFilteredAppointments={props.setFilteredAppointments}
                      item={item}
                    />
                  </div>
                ))}
          </Box>
        }
      </div>
      <AllAppDeletePopup
        selectedDay={selectedDay}
        delcount={delcount}
        setDelcount={setDelcount}
        docid={props.docid}
        handleNotification={handleNotification}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        filteredAppointments={props.filteredAppointments}
        setFilteredAppointments={props.setFilteredAppointments}
        dopen={dopen}
        setDopen={setDopen}
      />
      <SuccessNotification
        id="resdaylistnotification"
        type={notiType}
        setNotificationOpen={setNotificationOpen}
        notiMessage={notiMessage}
        notificationOpen={notificationOpen}
      />
    </Box>
  );
};
export default ResDayList;
