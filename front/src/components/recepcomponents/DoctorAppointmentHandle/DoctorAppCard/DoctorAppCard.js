import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Stack, Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import MarkAsCompleted from "../MarkAsCompletedPopup/MarkAsCompleted";
import AppCancelPopup from "../AppCancelPoplup/AppCancelPopup";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const DoctorAppCard = ({
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
  appno,
}) => {
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const handleMarkAsCompelted = () => {
    setMarkAsCompleted(true);
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

  const findOpacityStatus = (label) => {
    if (label == "Completed" || label == "cancelled" || label == "noshow" || label=="paid") {
      return true;
    } else {
      return false;
    }
  };

  const completedStatus = (item) => {
    if (item.appointment.status == "Completed" || item.appointment.status == "paid") {
      return (
        <>
          <DoneIcon
            color="success"
            sx={{ display: { xs: "none", md: "flex" }, fontSize: "38px" }}
          />
          <Typography variant="p" sx={{ display: { xs: "flex", md: "none" } }}>
            Completed
          </Typography>
        </>
      );
    } else if (item.appointment.status == "cancelled") {
      return (
        <>
          {" "}
          <CloseIcon
            color="warning"
            sx={{ display: { xs: "none", md: "flex" }, fontSize: "38px" }}
          />
          <Typography variant="p" sx={{ display: { xs: "flex", md: "none" } }}>
            Cancelled
          </Typography>
        </>
      );
    } else if (item.appointment.status == "noshow") {
      return (
        <>
          {" "}
          <ErrorOutlineOutlinedIcon
            color="gray"
            sx={{ display: { xs: "none", md: "flex" }, fontSize: "38px" }}
          />
          <Typography variant="p" sx={{ display: { xs: "flex", md: "none" } }}>
            No-Show
          </Typography>
        </>
      );
    }
  };

  const handleCancelAppointment = () => {
    setCancelOpen(true);
  };

  const isCompletedOrCancelled =
    item.appointment?.status === "Completed" ||
    item.appointment?.status === "cancelled" ||
    item.appointment?.status === "noshow" ||
    item.appointment?.status === "paid"
    ;
  return (
    <div>
      <Box
        sx={{
          width: { md: "100%", xs: "100%" },
          marginLeft: "auto",
          marginRight: "auto",
          opacity: isCompletedOrCancelled ? 0.5 : 1,
          pointerEvents: isCompletedOrCancelled ? "none" : "auto",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid sx={{ display: { md: "flex", xs: "none" } }} item md={1}>
            <Avatar
              sx={{ bgcolor: "rgb(121, 204, 190)", width: 30, height: 30 }}
            >
              <Typography
                sx={{
                  opacity: findOpacityStatus(item.appointment?.status)
                    ? 0.5
                    : 1,
                }}
                variant="h6"
              >
                {appno + 1}
              </Typography>
            </Avatar>
          </Grid>
          <Grid sx={{ display: { md: "flex", xs: "none" } }} item md={3}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "rgb(114, 114, 114)",
                textAlign: "left",
                opacity: findOpacityStatus(item.appointment?.status) ? 0.5 : 1,
              }}
              variant="h6"
            >
              {getStartingTime(item.appointment?.dateTime)}-
              {getEndingTime(item.appointment?.dateTime)}
            </Typography>
          </Grid>
          <Grid item md={8} xs>
            <Card
              sx={{
                backgroundColor: "#FFFF",
                textAlign: "left",
                marginBottom: 2,
                // border: "1px solid #3B877A",
                borderRadius: "5px",
              }}
            >
              <Stack direction={"column"}>
                <CardContent>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      alignItem: "center",
                    }}
                  >
                    <Typography data-testid="dappointment-name" variant="h5">
                      {item.patient?.fullName}
                    </Typography>
                    <Typography
                      data-testid="dappointment-no"
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      {item.patient?.contactNumber}
                    </Typography>
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
                    {isCompletedOrCancelled ? (
                      <div></div>
                    ) : (
                      <Box>
                        <IconButton
                          data-testid="doneicon"
                          onClick={handleMarkAsCompelted}
                        >
                          <DoneIcon color="success" />
                        </IconButton>

                        <IconButton
                          data-testid="cancelicon"
                          onClick={handleCancelAppointment}
                        >
                          <CloseIcon
                            sx={{ marginLeft: "auto", color: "#E60000" }}
                          />
                        </IconButton>
                      </Box>
                    )}
                    <Typography
                      sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.appointment.dateTime}
                    </Typography>
                  </Stack>
                </CardContent>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <MarkAsCompleted
        handleNotification={handleNotification}
        delcount={delcount}
        setDelcount={setDelcount}
        item={item}
        markOpen={markAsCompleted}
        setMarkAsCompleted={setMarkAsCompleted}
      />
      <AppCancelPopup
        handleNotification={handleNotification}
        item={item}
        delcount={delcount}
        setDelcount={setDelcount}
        cancelOpen={cancelOpen}
        setCancelOpen={setCancelOpen}
      ></AppCancelPopup>
    </div>
  );
};

export default DoctorAppCard;
