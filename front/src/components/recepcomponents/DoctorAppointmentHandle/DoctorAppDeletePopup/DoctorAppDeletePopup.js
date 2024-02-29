import * as React from "react";

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

export default function DoctorAppDeletePopup({doctorAppDeleteOpen,setDoctorAppDeleteOpen,setNotificationOpen,setNotiMessage,notiMessage}) {
  // const [enameError,seteNameError]=useState(false)
  // const [eaddressError,seteAddressError]=useState(false)
  // const [enicError,seteNicError]=useState(false)
  const [etimevalueError, seteTimeValueError] = useState(false);

  // const [ename,setEName]=useState(item.name)
  // const [eaddress,setEAddress]=useState(item.address)
  // const [enic,setENic]=useState(item.nic)
  const [timevalue, setTimeValue] = useState("");
  const [rdelete,setRdelete]=useState(false);


  const handleNotification=(msg)=>
  {
      //console.log(msg)
      setDoctorAppDeleteOpen(false);
      setNotiMessage(msg);
     setNotificationOpen(true);
     console.log(notiMessage);
    
     
  }


  const handleRealAllDelete=(msg)=>
  {
    setDoctorAppDeleteOpen(false);
    handleNotification(msg);
   
    

  }

  const handleRealDelete=(item)=>
  {
   // setAppointList(appointlist.filter((itemf)=>itemf.nic!==item.nic));
    //setIsDisabled(true);
   // setDelcount(delcount+1);
    setDoctorAppDeleteOpen(false);
  //  handleNotification("Appointment deleted succesfully!");

  }

  const handleClose = () => {
    setDoctorAppDeleteOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Dialog open={doctorAppDeleteOpen} onClose={handleClose}>
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
              Are you sure you want to Cancel the all appointments?
            </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:'flex-end',paddingRight:'5%'}}>
            <Button onClick={()=>handleRealAllDelete("All appointemnts are Cancelled Successfully!")}
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
