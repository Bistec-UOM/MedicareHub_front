import * as React from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

export default function DoctorAllAppDeletePopup({cancelAll,setCancelAll,selectedDay,delcount,setDelcount,docid,handleNotification, dopen, setDopen,filteredAppointments,setFilteredAppointments,isDisabled,setIsDisabled }) {
  // const [enameError,seteNameError]=useState(false)
  // const [eaddressError,seteAddressError]=useState(false)
  // const [enicError,seteNicError]=useState(false)
  const [etimevalueError, seteTimeValueError] = useState(false);

  // const [ename,setEName]=useState(item.name)
  // const [eaddress,setEAddress]=useState(item.address)
  // const [enic,setENic]=useState(item.nic)
  const [timevalue, setTimeValue] = useState("");
  const [rdelete,setRdelete]=useState(false);

  async function  handleAllAppDelete()
  {

    try
    {
        // console.log(item.appointment.id)
        // console.log(item.appointment.dateTime)
        // console.log(item.appointment.doctorId)
        console.log("docid",docid);
        console.log("selectedday",selectedDay);
        await axios.put(`https://localhost:7205/api/Appointment/doctor/${docid}/day/${selectedDay}`);
        setDelcount(delcount+1);
        setCancelAll(false);
        handleNotification("All appointment Cancelled succesfully!");
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


  const handleClickOpen = () => {
    setDopen(true);
  };

  const handleClose = () => {
    setCancelAll(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Dialog open={cancelAll} onClose={handleClose}>
        <Box sx={{ width: {xs:"100%",sm:"500px"}, height: "150px" }}>
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
            <ErrorIcon
              sx={{ color: "red", marginRight: "2%",fontSize:'2rem' }}
            />
            <Typography  sx={{ marginTop:'1%',color:'#000000' }}>
              Are you sure the entire list  to be Canceled?
            </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:'flex-end',paddingRight:'5%'}}>
            <Button onClick={handleAllAppDelete}
              sx={{
                backgroundColor: "#F44336", // Replace with your desired color
                "&:hover": {
                  backgroundColor: "#F44336", // Replace with your desired hover color
                },
                marginLeft: "20px",
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
