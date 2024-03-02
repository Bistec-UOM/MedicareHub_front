import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { CardContent, IconButton, TextField, Typography } from "@mui/material";

import { useState } from "react";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Stack } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function MarkAsCompleted({item,handleNotification,delcount,setDelcount,setMarkAsCompleted,markOpen }) {
  // const [enameError,seteNameError]=useState(false)
  // const [eaddressError,seteAddressError]=useState(false)
  // const [enicError,seteNicError]=useState(false)
  const [etimevalueError, seteTimeValueError] = useState(false);

  // const [ename,setEName]=useState(item.name)
  // const [eaddress,setEAddress]=useState(item.address)
  // const [enic,setENic]=useState(item.nic)
  const [timevalue, setTimeValue] = useState("");
  const [rdelete,setRdelete]=useState(false);

 

  const handleClickOpen = () => {
    //setDaopen(true);
  };

  const handleClose = () => {
    setMarkAsCompleted(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
  }

  async function  handleMarkAsCompelted(item)
  {

    try
    {
        console.log(item.appointment.id)
        console.log(item.appointment.dateTime)
        console.log(item.appointment.doctorId)
        await axios.put(`https://localhost:7205/updateStatus/${item.appointment.id}`,
    {
     
      id:item.appointment.id,
      Datetime:item.appointment.dateTime,
      status: "Completed",
       patientId:item.appointment.patientId,
       doctorId:item.appointment.doctorId,
       recepId:item.appointment.recepId
    
    });
    setDelcount(delcount+1);
    setMarkAsCompleted(false);
    handleNotification("Appointment Completed succesfully!");
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

  return (
    <React.Fragment>
      <Dialog open={markOpen} onClose={handleClose} >
        <Box sx={{ width: {xs:"100%",sm:"500px"}, height: "160px",paddingBottom:'20px' }}>
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
          </Box>
          <Box  sx={{display:'flex',flexDirection:'row' ,alignItem: "center", margin: "3%" }}>
            <ErrorIcon color="success"
              sx={{ marginRight: "2%",fontSize:'2rem' }}
            />
            <Typography  sx={{ marginTop:'1%',color:'#000000' }}>
              Are you sure you want mark as completed the appointment?
            </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:'flex-end',paddingRight:'5%'}}>
            <Button onClick={()=>handleMarkAsCompelted(item)} color="success"
              sx={{
                // backgroundColor: "#2BA658", // Replace with your desired color
                // "&:hover": {
                //   backgroundColor: "#2BA658", // Replace with your desired hover color
                // },
                marginLeft: "20px",
                marginBottom:"20px"
              }}
              variant="contained"
              type="submit"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
