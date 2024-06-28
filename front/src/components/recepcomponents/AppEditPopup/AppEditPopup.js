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

export default function AppEditPopup({
  delcount,
  setDelcount,
  selectedDay,
  appEditOpen,
  setAppEditOpen,
  handleNotification,
  docid,
  appointmentList,
  setAppointmentList,
  appAddPopupCount,
  setAppAddPopupCount,
  activeId,
  patientList,
  apopen,
  activeD,
  item,
}) {
  const minTime = dayjs(selectedDay).set("hour", 8).set("minute", 55); // 9:00 AM  minimum available time
  const maxTime = dayjs(selectedDay).set("hour", 17).set("minute", 0); // 5:00 PM  maximum available time
  const [selectedTime, setSelectedTime] = useState(
    dayjs(dayjs(selectedDay).hour(9).minute(0).second(0))
  ); //set the default selected time as 9:00 AM
  const [appTime, setAppTime] = useState({
    hours: " ",
    minutes: " ",
    ampm: " ",
  });
  const [activeData, setActiveData] = useState({});
  const [appEditConLoading, setAppEditConLoading] = useState(false); //var for loading prop of app edit confirm button

  function formatAMPM(date) {
    //this function for display the selected date using am and pm,not used 24 based hours
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
  const handleClose = () => {
    setAppEditOpen(false);
  };
  async function handleUpdate(event) {
    setAppEditConLoading(true);
    event.preventDefault();
    var finalTime = getRealTime(appTime);
    var date = finalTime;
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
    try {
      var response = await axios.put(
        baseURL + endPoints.Appoinment + `${item.appointment.id}`,
        {
          id: item.appointment.id,
          Datetime: formattedDate,
          status: item.appointment.status,
          patientId: item.appointment.patientId,
          doctorId: item.appointment.doctorId,
          recepId: item.appointment.recepId,
        },
        setHeaders()
      );
      if (response.data == 0) {
        setAppEditConLoading(false);
        setDelcount(delcount + 1);
        setAppEditOpen(false);
        handleNotification("Appointment Edited succesfully!", "success");
      } else if (response.data == 2) {
        setAppEditConLoading(false);
        handleNotification(
          "Time slot has been blocked. Select another time slot",
          "error"
        );
      } else if (response.data == 1) {
        setAppEditConLoading(false);
        handleNotification(
          "Time slot has been already booked!. Select another time slot",
          "error"
        );
      }
    } catch (err) {
      setAppEditConLoading(false);
      handleNotification("Network Error Occured!", "error");
    }
  }

  useEffect(() => {
    formatAMPM(selectedTime);
    if (patientList && Array.isArray(patientList)) {
      const filteredData = patientList.find(
        (patient) => patient.nic === activeId
      );
      setActiveData(filteredData);
    }
  }, [appAddPopupCount, activeId, patientList, selectedTime]);

  useEffect(() => {}, [activeData]);

  return (
    <React.Fragment>
      <Dialog open={appEditOpen} onClose={handleClose}>
        <Box sx={{ width: { sm: "600px", xs: "280px" } }}>
          <form autoComplete="false" noValidate onSubmit={handleUpdate}>
            <Box>
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
              <Box></Box>
              <Stack
                direction={"column"}
                sx={{
                  justifyContent: "space-between",
                  padding: "2%",
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
                        height: { md: "125px", xs: "180px" },
                        marginBottom: { xs: "5%", sm: 0 },
                        width: "100%",
                        marginRight: {
                          sm: 0,
                          xs: 5,
                        },
                      }}
                    >
                      <Stack direction={"column"}>
                        <Stack
                          direction={"row"}
                          sx={{
                            justifyContent: "space-between",
                            alignItem: "center",
                          }}
                        >
                          <Typography sx={{ padding: "2%" }} variant="h5">
                            {item.patient.name}
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography
                            sx={{ padding: "2%" }}
                            color="text.secondary"
                          >
                            {item.patient.nic}
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
                            {item.patient.address}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {item.patient.contactNumber}
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
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  width: "100%",
                }}
              >
                <BasicTimePicker
                  sx={{ overflow: { xs: "hidden" } }}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  minTime={minTime}
                  maxTime={maxTime}
                />
                <LoadingButton
                  data-testid="editconfirm"
                  loading={appEditConLoading}
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
