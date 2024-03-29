import * as React from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import { CardContent, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

export default function AllAppDeletePopup({selectedDay,delcount,setDelcount,docid,handleNotification, dopen, setDopen,filteredAppointments,setFilteredAppointments,isDisabled,setIsDisabled }) {
 
  const handleRealAllDelete=()=>
  {
    axios.delete(`https://localhost:7205/api/Appointment/doctor/${docid}/day/${selectedDay}`)
    .then(response => {
     // console.log('Resource deleted successfully:', response.data);
      setDelcount(delcount+1);
      setDopen(false);
      handleNotification("All appointments deleted succesfully!");
    })
    .catch(error => {
      console.error('Error deleting resource:', error);
    });

  }


  const handleClose = () => {
    setDopen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={dopen} onClose={handleClose}>
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
              Are you sure the entire list for this to be deleted?
            </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:'flex-end',paddingRight:'5%'}}>
            <Button onClick={handleRealAllDelete}
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
