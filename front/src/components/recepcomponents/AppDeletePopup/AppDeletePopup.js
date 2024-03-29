import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { CardContent, IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

export default function AppDeletePopup({appointlist,setAppointList,handleNotification,item,delcount,setDelcount, daopen, setDaopen,filteredAppointments,setFilteredAppointments,isDisabled,setIsDisabled }) {

  const handleRealDelete=(item)=>
  {
   
    axios.delete(`https://localhost:7205/api/Appointment/${item.appointment.id}`)
  .then(response => {
    //console.log('Resource deleted successfully:', response.data);
    setDelcount(delcount+1);  //for fetching the newly updated app list
    setDaopen(false);
    handleNotification("Appointment deleted succesfully!","success");
   // console.log("inside real delte"+filteredAppointments);
  })
  .catch(error => {
    console.error('Error deleting resource:', error);
  });
  }
  const handleClose = () => {
    setDaopen(false);
  };
  return (
    <React.Fragment>
      <Dialog open={daopen} onClose={handleClose}>
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
              Are you sure you want to delete the appointment?
            </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:'flex-end',paddingRight:'5%'}}>
            <Button onClick={()=>handleRealDelete(item)}
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
