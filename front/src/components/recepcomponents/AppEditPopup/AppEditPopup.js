import * as React from "react";
import BasicTimePicker from "../TimePicker/TimePicker";
import axios from "axios";

import Moment from "react-moment";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { CardContent, IconButton, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import SearchBar from "../Searchbar/Searchbar";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Stack } from "@mui/material";

export default function AppEditPopup({
  delcount,
  setDelcount,
  selectedDay,
    appEditOpen,setAppEditOpen,
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
  item
  
}) {
  // const [enameError,seteNameError]=useState(false)
  // const [eaddressError,seteAddressError]=useState(false)
  //console.log(activeD)
  // const [enicError,seteNicError]=useState(false)
  const [etimevalueError, seteTimeValueError] = useState(false);

  const [selectedTime, setSelectedTime] = useState(dayjs("2022-04-17T08:30"));

  // const [ename,setEName]=useState(item.name)
  // const [eaddress,setEAddress]=useState(item.address)
  // const [enic,setENic]=useState(item.nic)
  // const [timevalueHour, setTimeValueHour] = useState( String(dayjs(selectedTime).get("hour")).padStart(2, "0"));
  // const [timevalueMin, setTimeValueMin] = useState(String(dayjs(selectedTime).get("minute")).padStart(2, "0"));

  const [appTime,setAppTime]=useState({
    hours:" ",
    minutes:" ",
    ampm:" "
  })
    

  // useEffect=(()=>
  // {
  //   setTimeValue({...timevalue,hour:dayjs(selectedTime).get('hour'),minutes:dayjs(selectedTime).get('minute')})

  //   console.log(dayjs(selectedTime).get('minute'));
  // },[selectedTime,timevalue])

  const [activeData, setActiveData] = useState({});

  function formatAMPM(date) {  //this function for display the selected date using am and pm,not used 24 based hours
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

  const date = new Date(selectedDay);
  date.setHours(hours, timeObject.minutes, 0, 0);
  return date;



  }

  // useEffect=(()=>{
  //   console.log("sele",formatAMPM(selectedTime))
  // },[selectedTime])
  

  const handleTimeChange = (time) => {
    setSelectedTime("inse time", time);
   // console.log(appTime);
  };

  const handleClickOpen = () => {
    setAppEditOpen(true);
  };

  const handleClose = () => {
    console.log("se", selectedTime);
    setAppEditOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // setAppointmentList([...appointmentList,{name:activeData.name,city:activeData.city,nic:activeData.nic,phone:activeData.phone,did:docid,time:"9:00 AM"}]);
    setAppEditOpen(false);
    handleNotification("Appointment Edited succesfully!");
  }

  const updateAppointment = async (id, appointment) => {
    try {
      setAppEditOpen(false);
      handleNotification("Appointment Edited succesfully!");
      const response = await axios.put(`https://localhost:7205/api/Appointment/${id}`, appointment);
      return response.data; // You may handle the response data as needed
    } catch (error) {
      // Handle error
      console.error('Error updating appointment:', error);
      throw error; // You can choose to handle errors differently based on your application's requirements
    }
  };


  async function handleUpdate(event)
  {
   event.preventDefault();
   console.log("inside handle update");
   var finalTime=getRealTime(appTime);
   var date=finalTime;
   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
  // console.log("final time",finalTime)
  // var formattedDateString = finalTime.toISOString();
   console.log(formattedDate);

  try
      {
       
          await axios.put(`https://localhost:7205/api/Appointment/${item.appointment.id}`,
      {
       
        id:item.appointment.id,
        Datetime:formattedDate,
        status: item.appointment.status,
         patientId:item.appointment.patientId,
         doctorId:item.appointment.doctorId,
         recepId:item.appointment.recepId
      
      });
      setDelcount(delcount+1);
      setAppEditOpen(false);
      handleNotification("Appointment Edited succesfully!");
     // console.log()
     // setAppEditOpen(false);
     // handleNotification("Appointment Edited succesfully!");
      // setSuccessState("Student succesfully updated!")
      // navigate('/');
       

       
      
      }
  catch(err)
      {
        //setNerror(err.response.data);
      }
 }


  useEffect(() => {
    //console.log("sele",formatAMPM(selectedTime))
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
      <Dialog open={appEditOpen} onClose={handleClose}>
        <Box sx={{ width: { sm: "600px", xs: "280px" } }}>
          <form autoComplete="false" noValidate onSubmit={handleUpdate} >
            <Box>
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
              <Stack
                direction={"column"}
                sx={{
                  justifyContent: "space-between",
                  padding: "20px",
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
                sx={{overflow:{xs:'hidden'}}}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                 
                  // setSelectedTimeH={(value) => setTimeValue({...timevalue,hour:value})}
                  // setSelectedTimeM={(value) => setTimeValue({...timevalue,minutes:value})}
                />
              
                <Button
                 
                  sx={{
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
