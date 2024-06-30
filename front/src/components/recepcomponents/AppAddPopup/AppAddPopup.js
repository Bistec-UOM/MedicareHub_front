import * as React from "react";
import BasicTimePicker from "../TimePicker/TimePicker";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Stack } from "@mui/material";
import { baseURL, endPoints } from "../../../Services/Appointment";
import { setHeaders } from "../../../Services/Auth";
import { LoadingButton } from "@mui/lab";
import theme from "../../Style";
import DoneIcon from "@mui/icons-material/Done";

export default function AppAddPopup({
  filteredAppointments,
  selectedDay,
  handleNotification,
  docid,
  appointmentList,
  setAppointmentList,
  appAddPopupCount,
  setAppAddPopupCount,
  activeId,
  patientList,
  apopen,
  setApopen,
  activeD,
  dayAppTotal,
  setDayAppTotal,
  unableTimeSlots,
  setUnableTimeSlots,
}) {
  const minTime = dayjs(selectedDay).set("hour", 8).set("minute", 55); // 9:00 AM  minimum available time
  const maxTime = dayjs(selectedDay).set("hour", 17).set("minute", 0); // 5:00 PM  maximum available time
  const [RloadDone, setRloadDone] = useState(true); //state for app add loading
  const [selectedTime, setSelectedTime] = useState(
    dayjs(selectedDay).hour(9).minute(0).second(0)
  ); //default selected date and time of the date picker
  const [confirmDisabled, setConfirmDisabled] = useState(false); //var for confirm disabled for app limiting func
  const [appTime, setAppTime] = useState({
    //var for selected appointment time
    hours: " ",
    minutes: " ",
    ampm: " ",
  });
  const [activeData, setActiveData] = useState({}); //for storing the selected patient object
  const [appConfirmLoading, setAppConfirmLoading] = useState(false); //var for loading prop of appconfirm button
  function formatAMPM(date) {
    var hours = dayjs(date).get("hour");
    var minutes = dayjs(date).get("minute");
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    setAppTime({ ...appTime, hours: hours, minutes: minutes, ampm: ampm });
  }
  function getRealTime(timeObject) {
    //this is used for converting the displayed time to the pasing body time in the backend
    let hours = parseInt(timeObject.hours, 10);
    if (timeObject.ampm === "pm" && hours !== 12) {
      hours += 12;
    } else if (timeObject.ampm === "am" && hours === 12) {
      hours = 0;
    }

    const date = new Date(selectedDay);
    date.setHours(hours, timeObject.minutes, 0, 0);
    return date;
  }
  useEffect(() => {
    //check selected time is blocked or not in the valid range
    if (
      unableTimeSlots.length != 0 &&
      selectedTime.isAfter(unableTimeSlots[0].startTime) &&
      selectedTime.isBefore(unableTimeSlots[0].endTime)
    ) {
      handleNotification(
        "Time slot has been blocked!. Select another time slot",
        "error"
      );
      setConfirmDisabled(true);
      return;
    } else {
      setConfirmDisabled(false);
    }
    const isTimeInvalid = !(
      selectedTime.isAfter(minTime) && selectedTime.isBefore(maxTime)
    );
    const disableButton = isTimeInvalid || dayAppTotal >= 10;
    setConfirmDisabled(disableButton);
    console.log("una", unableTimeSlots);
  }, [selectedTime, dayAppTotal]);
  const handleClose = () => {
    setApopen(false);
  };

  async function handleSubmit(event) {
    setRloadDone(true);
    setAppConfirmLoading(true);
    event.preventDefault();
    var finalTime = getRealTime(appTime);
    var date = finalTime; //time object for scheduled appointment time
    const createdDay = new Date(); //current time of appointment making time
    //format the time to string form
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;

    const formattedCreatedDate = `${createdDay.getFullYear()}-${(
      createdDay.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${createdDay
      .getDate()
      .toString()
      .padStart(2, "0")}T${createdDay
      .getHours()
      .toString()
      .padStart(2, "0")}:${createdDay
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${createdDay
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${createdDay
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    let obj = {
      id: 0,
      dateTime: formattedDate,
      status: "new",
      patientId: activeData.id,
      createdAt: formattedCreatedDate,
      doctorId: docid,
      recepId: 1,
    };
    try {
      var response = await axios.post(
        baseURL + endPoints.Appoinment,
        obj,
        setHeaders()
      );
      if (response.data == 0) {
        //check already appointments
        setAppConfirmLoading(false);
        setRloadDone(true);
        setApopen(false);
        setDayAppTotal(dayAppTotal + 1);
        handleNotification("Appointment Added succesfully!", "success");
      } else if (response.data == 1) {
        setAppConfirmLoading(false);
        setRloadDone(true);
        handleNotification(
          "You have already an appointment on that time !. Select another time slot",
          "error"
        );
      } else if (response.data == 3) {
        setAppConfirmLoading(false);
        setRloadDone(true);
        handleNotification(
          "Time slot has been blocked!. Select another time slot",
          "error"
        );
      } else {
        setAppConfirmLoading(false);
        setRloadDone(true);
        handleNotification(
          "Time slot has been already booked!. Select another time slot",
          "error"
        );
      }
    } catch (err) {
      setAppConfirmLoading(false);
      // handleNotification(err.response.data,"error");  //handling api request error
      handleNotification("Network Error Occured!", "error");
    }
  }
  useEffect(() => {
    formatAMPM(selectedTime);
    if (patientList && Array.isArray(patientList)) {
      //getting the selected patient
      const filteredData = patientList.find(
        (patient) => patient.id === activeId
      );
      setActiveData(filteredData);
    }
  }, [appAddPopupCount, activeId, patientList, selectedTime]);

  return (
    <React.Fragment>
      <Dialog open={apopen} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: theme.palette.custom.greenH,
            height: "40px",
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Box sx={{ width: { sm: "600px", xs: "280px", padding: "20px" } }}>
          <form autoComplete="false" noValidate onSubmit={handleSubmit}>
            <Box>
              <Stack
                direction={"column"}
                sx={{
                  justifyContent: "space-between",

                  alignItem: "center",
                }}
              >
                <Grid container sx={{ marginTop: "3%" }}>
                  <Grid md={6} item>
                    <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding: "2%",
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height: { md: "125px", sm: "100px" },
                        marginBottom: { xs: "5%", sm: 0 },
                        width: "100%",
                        marginRight: {
                          sm: 0,
                          xs: 5,
                        },
                      }}
                    >
                      <Stack
                        direction={"column"}
                        sx={{ height: { xs: "100px", md: "100%" } }}
                      >
                        <Stack
                          direction={"row"}
                          sx={{
                            justifyContent: "space-between",
                            alignItem: "center",
                            height: { xs: "100px", md: "100%" },
                          }}
                        >
                          <Typography sx={{ padding: "2%" }} variant="h5">
                            {activeData?.fullName}
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography
                            sx={{ padding: "2%" }}
                            color="text.secondary"
                          >
                            {activeData?.nic}
                          </Typography>
                        </Stack>
                        <Stack
                          sx={{
                            justifyContent: "space-between",
                            alignItem: "center",
                            flexDirection: { xs: "column", sm: "row" },
                          }}
                        >
                          <Typography
                            sx={{ padding: "2%" }}
                            variant="body2"
                            color="text.secondary"
                          >
                            {activeData?.city}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {activeData?.phone}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid md={2} item sx={{ padding: "0 2%" }}>
                    <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding: "2%",
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height: "125px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ color: "#3B877A" }} variant="h2">
                        {appTime.hours}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={2} item sx={{ padding: "0 2%" }}>
                    <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding: "2%",
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height: "125px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ color: "#3B877A" }} variant="h2">
                        {appTime.minutes}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={2} item sx={{ padding: "0 2%" }}>
                    <Box
                      sx={{
                        backgroundColor: "#FFFF",
                        textAlign: "left",
                        padding: "2%",
                        border: "1px solid #3B877A",
                        borderRadius: 5,
                        height: "125px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ color: "#3B877A" }} variant="h4">
                        {appTime.ampm}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
            <DialogActions>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  width: "100%",
                }}
              >
                <BasicTimePicker
                  data-testid="basictimepicker"
                  sx={{ overflow: { xs: "hidden" } }}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  label="Select your time"
                  minTime={minTime}
                  maxTime={maxTime}
                />

                <LoadingButton
                  data-testid="save-appointment"
                  disabled={confirmDisabled}
                  loading={appConfirmLoading}
                  size="small"
                  sx={{
                    marginTop: { xs: "20px !important", md: "0px" },
                  }}
                  variant="contained"
                  type="submit"
                  endIcon={<DoneIcon></DoneIcon>}
                >
                  Confirm
                </LoadingButton>
              </Stack>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
