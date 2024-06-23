import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import AppDeletePopup from "../AppDeletePopup/AppDeletePopup";
import AppEditPopup from "../AppEditPopup/AppEditPopup";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {Avatar} from "@mui/material";
import { BoltRounded } from "@mui/icons-material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


const AppointmentCard = ({
  selectedDay,
  docid,
  appointlist,
  setAppointList,
  handleNotification,
  filteredAppointments,
  setFilteredAppointments,
  item,
  delcount,
  setDelcount,
  appno
}) => {
  const [daopen, setDaopen] = useState(false); //var for app delete popup
  const [appEditOpen, setAppEditOpen] = useState(false); //var for appEdit open popup
  const isCompletedOrCancelled =
    item.appointment?.status === "Completed" ||
    item.appointment?.status === "cancelled";
  const handleEditAppointment = () => {
    setAppEditOpen(true);
  };

  function getStartingTime(dateTimeString) {
    // Create a Date object from the date-time string
    const dateTime = new Date(dateTimeString);
    let hours = dateTime.getHours(); // Get hours
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12
    const minutes = dateTime.getMinutes(); // Get minutes
    const amOrPm = dateTime.getHours() >= 12 ? "PM" : "AM"; // Get AM or PM
    const timeString = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amOrPm}`;
    return timeString;
  }
  const completedStatus = (item) => {
    if (item.appointment.status == "Completed") {
      return (
        <><DoneIcon color="success" sx={{display:{xs:'none',md:'flex'},fontSize: "38px" }} />
        <Typography variant="p" sx={{display:{xs:'flex',md:'none'}}}>Completed</Typography></>
      );
    } else if (item.appointment.status == "cancelled") {
      return<> <CloseIcon color="warning" sx={{ display:{xs:'none',md:'flex'},fontSize: "38px" }} />
       <Typography variant="p"  sx={{display:{xs:'flex',md:'none'}}}>Cancelled</Typography>

      </>
    }
  };

  function getEndingTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    dateTime.setMinutes(dateTime.getMinutes() + 20); // Add 20 minutes to the current time
    let hours = dateTime.getHours();
    hours = hours % 12 || 12; // Convert 0 to 12
    const minutes = dateTime.getMinutes();
    const amOrPm = dateTime.getHours() >= 12 ? "PM" : "AM";
    const timeString = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amOrPm}`;

    return timeString;
  }
  const handleDeleteAppointment = () => {
    setDaopen(true);
  };

  const findOpacityStatus = (label) => {
    if (label == "Completed" || label == "cancelled") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box
      sx={{
        width: { md: "100%", xs: "100%" },
        marginLeft: "auto",
        marginRight: "auto", 
        opacity: isCompletedOrCancelled ? 0.5 : 1,
        pointerEvents: isCompletedOrCancelled ? "none" : "auto",
        height: '140px',
        marginBottom:{md:'0px',xs:'100px'},
        marginTop:{md:'0px',xs:'15%'},
       
      }}
    >
      <Grid container spacing={2} alignItems="center">
      <Grid sx={{display:{md:'flex',xs:'none'}}} item md={1}>
      <Avatar sx={{ bgcolor: 'rgb(121, 204, 190)', width: 30, height: 30 }}>
            <Typography  sx={{
                    opacity: findOpacityStatus(item.appointment?.status)
                      ? 0.5
                      : 1,
                  }} variant="h6">{appno+1}</Typography>
          </Avatar>
        </Grid>
        <Grid sx={{display:{md:'flex',xs:'none'}}} item md={3}>
          <Typography data-testid="appointment-time" sx={{fontSize:'18px',color:"rgb(114, 114, 114)",textAlign:"left",opacity: findOpacityStatus(item.appointment?.status)
                      ? 0.5
                      : 1,}} variant="h6" >{getStartingTime(item.appointment?.dateTime)}-
          {getEndingTime(item.appointment?.dateTime)}</Typography>
        </Grid>
        <Grid item md={8} xs>
          <Card
            backgroundColor="success"
            sx={{
              textAlign: "left",
              marginBottom: 2,
              borderRadius: '5px',
            }}
          >
            <Stack direction={"column"}>
              <CardContent sx={{ display: "flex" }}> 
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        alignItem: "center",
                      }}
                    >
                      <Typography data-testid="appointment-name" variant="h5">
                        {item.patient?.fullName}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography data-testid="appointment-address" variant="body2" color="text.secondary">
                      {item.patient?.address}
                    </Typography>
                    <Typography data-testid="appointment-no" variant="body2" color="text.secondary">
                      {item.patient?.contactNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography
                      sx={{ display: { xs: "flex", sm: "flex", md: "none",color:"rgb(114, 114, 114)" } }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {getStartingTime(item.appointment?.dateTime)}-
                      {getEndingTime(item.appointment?.dateTime)}
                    </Typography>
                    {isCompletedOrCancelled ? 
                      <div> {completedStatus(item)} </div>
                    : 
                      <Box>
                        <IconButton data-testid="deletebutton"  onClick={handleDeleteAppointment}>
                          <DeleteIcon  sx={{ color: "#E60000" }} />
                        </IconButton>
                        <IconButton data-testid="editbutton"  onClick={handleEditAppointment}>
                          <EditIcon sx={{ color: "#F66444" }} />
                        </IconButton>
                      </Box>
                    }
                  </Grid>
                </Grid>
              </CardContent>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <AppDeletePopup
        appointlist={appointlist}
        setAppointList={setAppointList}
        handleNotification={handleNotification}
        delcount={delcount}
        setDelcount={setDelcount}
        item={item}
        daopen={daopen}
        setDaopen={setDaopen}
        filteredAppointments={filteredAppointments}
        setFilteredAppointments={setFilteredAppointments}
      />
      <AppEditPopup
        delcount={delcount}
        setDelcount={setDelcount}
        selectedDay={selectedDay}
        appEditOpen={appEditOpen}
        setAppEditOpen={setAppEditOpen}
        setAppointList={setAppointList}
        handleNotification={handleNotification}
        appointlist={appointlist}
        docid={docid}
        item={item}
      />
    </Box>
  );
};

export default AppointmentCard;
