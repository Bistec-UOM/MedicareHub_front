import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import AppDeletePopup from "../AppDeletePopup/AppDeletePopup";
import AppEditPopup from "../AppEditPopup/AppEditPopup";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

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
        <CheckCircleRoundedIcon color="success" sx={{ fontSize: "38px" }} />
      );
    } else if (item.appointment.status == "cancelled") {
      return <BlockRoundedIcon color="warning" sx={{ fontSize: "38px" }} />;
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

  return (
    <div>
      <Box
        sx={{
          width: { md: "80%", xs: "100%" },
          marginLeft: "auto",
          marginRight: "auto", // Disable pointer events
          opacity: isCompletedOrCancelled ? 0.5 : 1,
          pointerEvents: isCompletedOrCancelled ? "none" : "auto",
        }}
      >
        <Card
          backgroundColor="success"
          sx={{
            textAlign: "left",
            marginBottom: 2,
            border: "1px solid #3B877A",
            borderRadius: 5,
          }}
        >
          <Stack direction={"column"}>
            <CardContent>
              <Stack
                direction={"row"}
                sx={{ justifyContent: "space-between", alignItem: "center" }}
              >
                <Typography variant="h5">{item.patient?.fullName}</Typography>
                {completedStatus(item)}
              </Stack>
              <Stack
                sx={{
                  justifyContent: "space-between",
                  alignItem: "center",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.patient?.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.patient?.contactNumber}
                </Typography>
                {isCompletedOrCancelled ? (
                  <div></div>
                ) : (
                  <Box>
                    <IconButton onClick={handleDeleteAppointment}>
                      <DeleteIcon
                        sx={{ marginLeft: "auto", color: "#E60000" }}
                      />
                    </IconButton>
                    <IconButton onClick={handleEditAppointment}>
                      <EditIcon sx={{ color: "#F66444" }} />
                    </IconButton>
                  </Box>
                )}

                <Typography //display time range only inside the app card for small and xs screen
                  sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                  variant="body2"
                  color="text.secondary"
                >
                  {getStartingTime(item.appointment?.dateTime)}-
                  {getEndingTime(item.appointment?.dateTime)}
                </Typography>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </Box>
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
    </div>
  );
};

export default AppointmentCard;
