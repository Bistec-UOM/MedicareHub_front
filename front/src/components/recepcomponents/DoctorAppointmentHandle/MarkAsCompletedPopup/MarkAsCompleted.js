import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { baseURL,endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";

export default function MarkAsCompleted({
  item,
  handleNotification,
  delcount,
  setDelcount,
  setMarkAsCompleted,
  markOpen,
}) {

  const [markLoading,setMarkLoading]=useState(false);  //var for loading prop of mark as confirm button
  const handleClose = () => {
    setMarkAsCompleted(false);
  };
  //set for mark as completed of an appointment by doctor
  async function handleMarkAsCompelted(item) {
    setMarkLoading(true);
    try {
      await axios.put(
        baseURL+endPoints.UpdateStatusCompleted+`${item.appointment.id}`,
        {
          id: item.appointment.id,
          Datetime: item.appointment.dateTime,
          status: "Completed",
          patientId: item.appointment.patientId,
          doctorId: item.appointment.doctorId,
          recepId: item.appointment.recepId,
        },setHeaders()
      );
      setMarkLoading(false);
      setDelcount(delcount + 1);
      setMarkAsCompleted(false);
      handleNotification("Appointment Completed succesfully!","success");
    } catch (err) {
      setMarkLoading(false);
      handleNotification("Network Error Occured!","error");
    }
  }
  return(
    <Dialog open={markOpen} onClose={handleClose}>
    <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
      <Typography data-testid="confirmtext"> Are you sure you want to mark as completed the appointment?</Typography>
    </div>
    <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >No</Button>
      <LoadingButton  
        data-testid="doneconfirm"
        variant='contained' 
        size='small' 
        endIcon={<DoneIcon></DoneIcon>}           
        loading={markLoading}
        loadingPosition="end"
        onClick={() => handleMarkAsCompelted(item)}
      >Yes</LoadingButton>
    </div>
  </Dialog>
  )
  // return (
  //   <React.Fragment>
  //     <Dialog open={markOpen} onClose={handleClose}>
  //       <Box
  //         sx={{
  //           width: { xs: "100%", sm: "500px" },
  //           height: "160px",
  //           paddingBottom: "20px",
  //         }}
  //       >
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
  //             color="success"
  //             sx={{ marginRight: "2%", fontSize: "2rem" }}
  //           />
  //           <Typography sx={{ marginTop: "1%", color: "#000000" }}>
  //             Are you sure you want to mark as completed the appointment?
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
  //             onClick={() => handleMarkAsCompelted(item)}
  //             color="success"
  //             sx={{
  //               marginLeft: "20px",
  //               marginBottom: "20px",
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
