import * as React from "react";
import BasicTimePicker from "../TimePicker/TimePicker";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { CardContent, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Stack } from "@mui/material";

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
  appCountUseEff,
  setAppCountUseEff
}) {
  const [selectedTime, setSelectedTime] = useState(dayjs("2022-04-17T08:30"));
  const [confirmDisabled,setConfirmDisabled]=useState(false);
  const [appTime,setAppTime]=useState({
    hours:" ",
    minutes:" ",
    ampm:" "
  })
  const [activeData, setActiveData] = useState({});

  function formatAMPM(date) {  //setting the am,pm
    var hours = dayjs(date).get("hour");
    var minutes = dayjs(date).get("minute");
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    setAppTime({...appTime,hours:hours,minutes:minutes,ampm:ampm})
  }
  function getRealTime(timeObject)  //this is used for converting the displayed time to the pasing body time in the backend
  {
    let hours = parseInt(timeObject.hours, 10);
    if (timeObject.ampm === 'pm' && hours !== 12) {
      hours += 12;
  } else if (timeObject.ampm === 'am' && hours === 12) {
      hours = 0;
  }
 // console.log("selected",selectedDay)
  const date = new Date(selectedDay);
  date.setHours(hours, timeObject.minutes, 0, 0);
  return date;
  }
  const scheduledTimes = filteredAppointments.map(appointment => {
    return dayjs(appointment.appointment.dateTime).format('HH:mm');
  });

  const isTimeDisabled = (time) => {
    const selectedTimeStr = dayjs(time).format('HH:mm');
    return scheduledTimes.includes(selectedTimeStr);
  };
  useEffect(() => {
    //console.log("filt",scheduledTimes);
   // console.log("day app total inside appadd"+dayAppTotal);
    if(dayAppTotal>=10)  //disabling confirm button from adding more than 10 appointments for a day
    {
      setConfirmDisabled(true);
    }
    else{
      setConfirmDisabled(false);
    }
}
 )
  const handleClose = () => {
    console.log("se", selectedTime);
    setApopen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setApopen(false);
    handleNotification("A new appointment added succesfully!");
  }
  async function handleSubmit(event)
  {
      event.preventDefault();
      var finalTime=getRealTime(appTime);
      var date=finalTime;
      //format the time to string form
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
    //  console.log("isostring",formattedDate);
      //console.log(activeData.id)
     // console.log(docid);
      let obj= {
        id: 0,
        dateTime:formattedDate,
        status:"new",
        patientId: activeData.id,
        doctorId: docid,
        recepId:1
      }
      try{
          await axios.post("https://localhost:7205/api/Appointment",obj
         );
          //console.log(obj);
          setAppCountUseEff(appCountUseEff+1);
          setApopen(false);
          handleNotification("Appointment Added succesfully!");
         // console.log("Inside second useeff "+ appCountUseEff);
         // console.log("Inside second useeff apptotal "+ dayAppTotal);    
      }
      catch(err)
      {
      var msg=err.response.data;
     // console.log("Inseide error");
       //console.log(err.response.data);
         setError(msg);
      }
  }
  useEffect(() => {
    // console.log(activeId);
    formatAMPM(selectedTime)
   

    if (patientList && Array.isArray(patientList)) {
      const filteredData = patientList.find(
        (patient) => patient.nic === activeId
      );
      setActiveData(filteredData);
    }
  }, [appAddPopupCount, activeId, patientList,selectedTime]);

  useEffect(() => {
    // console.log("Updated Active Data:", activeData);
  }, [activeData]);

  return (
    <React.Fragment>
      <Dialog open={apopen} onClose={handleClose}>
              <Box
                sx={{
                  backgroundColor: "#DEF4F2",
                  height: "40px",
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
        <Box sx={{ width: { sm: "600px", xs: "280px",  padding: "20px", }}}>
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
                      <Stack direction={"column"} sx={{height:{xs:"100px",md:"100%"}}}>
                        <Stack
                          direction={"row"}
                          sx={{
                            justifyContent: "space-between",
                            alignItem: "center",
                            height:{xs:"100px",md:"100%"}
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
              <Stack direction={{xs:"column",sm:"row"}}
               
                sx={{
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  width: "100%",
                }}
              >
                <BasicTimePicker
                sx={{overflow:{xs:'hidden'}}}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  disabledItems={isTimeDisabled}

                  renderOption={(time, { selected }) => {
                    if (scheduledTimes.includes(time)) {
                      return <Typography style={{ color: 'gray' }}>{time}</Typography>;
                    }
                    return <Typography>{time}</Typography>;
                  }}  
                />      
                <Button
                  disabled={confirmDisabled}
                  sx={{
                    marginTop:{xs:'20px !important',md:'0px'},
                    backgroundColor: "#79CCBE",
                    "&:hover": {
                      backgroundColor: "#79CCBE",
                    },  
                  }}
                  variant="contained"
                  type="submit"
                >
                  Confirm
                </Button>
              </Stack>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
