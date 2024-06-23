import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { baseURL, endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';


export default function AppCancelPopup({
  appointlist,
  setAppointList,
  handleNotification,
  item,
  delcount,
  setDelcount,
  cancelOpen,
  setCancelOpen,
  filteredAppointments,
  setFilteredAppointments,
  isDisabled,
  setIsDisabled,
}) {

  const [cancelLoading,setCancelLoading]=useState(false); //var for loading prop of cancel confirmation button


  //changing the status of an app to canceled
  async function handleStatusUpdate(item) {
    setCancelLoading(true);
    try {
      await axios.put(
        baseURL + endPoints.AppCancel + `${item.appointment.id}`, //update the app status to cancelled
        {
          id: item.appointment.id,
          Datetime: item.appointment.dateTime,
          status: "cancelled",
          patientId: item.appointment.patientId,
          doctorId: item.appointment.doctorId,
          recepId: item.appointment.recepId,
        },setHeaders()
      );
      setCancelLoading(false);
      setDelcount(delcount + 1); //for fetching newly status updated appointments
      setCancelOpen(false);
      handleNotification("Appointment Cancelled succesfully!", "success");
    } catch (err) {
      setCancelLoading(false);
      handleNotification("Network Error Occured!", "error");
    }
  }
  const handleClose = () => {
    setCancelOpen(false);
  };

  return(
    <Dialog open={cancelOpen} onClose={handleClose}>
    <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
      <Typography data-testid="canceltext"> Are you sure you want to cancel the appointment?</Typography>
    </div>
    <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >No</Button>
      <LoadingButton 
        data-testid="cancelconfirm"
        variant='contained' 
        size='small' 
        endIcon={<DoneIcon></DoneIcon>}           
        loading={cancelLoading}
        loadingPosition="end"
        onClick={() => handleStatusUpdate(item)}
      >Yes</LoadingButton>
    </div>
  </Dialog>
  )


  // return (
  //   <React.Fragment>
  //     <Dialog open={cancelOpen} onClose={handleClose}>
  //       <Box sx={{ width: { xs: "100%", sm: "500px" }, height: "150px" }}>
  //         <Box>
  //           <Box
  //             sx={{
  //               backgroundColor: "#DEF4F2",
  //               height: "40px",
  //               display: "flex",
  //               justifyContent: "flex-end",
  //               width: "100%",
  //             }}
  //           >
  //             <IconButton onClick={handleClose}>
  //               <CloseIcon />
  //             </IconButton>
  //           </Box>
  //         </Box>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             flexDirection: "row",
  //             alignItem: "center",
  //             margin: "3%",
  //           }}
  //         >
  //           <ErrorIcon
  //             sx={{ color: "red", marginRight: "2%", fontSize: "2rem" }}
  //           />
  //           <Typography sx={{ marginTop: "1%", color: "#000000" }}>
  //             Are you sure you want to cancel the appointment?
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "flex-end",
  //             paddingRight: "5%",
  //           }}
  //         >
  //           <Button
  //             onClick={() => handleStatusUpdate(item)}
  //             sx={{
  //               backgroundColor: "#F44336",
  //               "&:hover": {
  //                 backgroundColor: "#F44336",
  //               },
  //               marginLeft: "20px",
  //             }}
  //             variant="contained"
  //             type="submit"
  //           >
  //             Confirm
  //           </Button>
  //         </Box>
  //       </Box>
  //     </Dialog>
  //   </React.Fragment>
  // );
}
