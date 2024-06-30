import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { baseURL,endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";


export default function UnavailableTimeDeletePopup({handleNotification,item,unDelCount,setUnDelCount, unTimeOpen, setUnTimeOpen}) {
  


  const [delConLoading,setDelConLoading]=useState(false);  //var for loading prop of remove confirm button
  const handleRealDelete=(item)=> //for real deleting of an unavailable date from table
  {
    setDelConLoading(true);
    axios.delete(baseURL+endPoints.UnblockTime+`${item.id}`,setHeaders())
  .then(response => {
    setDelConLoading(false);
    setUnDelCount(unDelCount+1);  //for fetching the newly updated unavailable time slot list
    setUnTimeOpen(false);
    handleNotification("Unavailable Time Slot Removed succesfully!","success");
  })
  .catch(error => {
    setDelConLoading(false);
    if (!error.response) {// Network error
    handleNotification("Network error! Please check your internet connection.", "error");
  }
  else 
  {
    handleNotification("Appointment is still progressing!","error");
  }
  }
)
  }
  const handleClose = () => {
    setUnTimeOpen(false);
  };

  return(
    <Dialog open={unTimeOpen} onClose={handleClose}>
        {console.log(item)}
    <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
      <Typography> Are you sure you want to Remove the Blocked TimeSlot?</Typography>
    </div>
    <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >No</Button>
      <LoadingButton 
        data-testid="confirmdelete"
        variant='contained' 
        size='small' 
        endIcon={<DoneIcon></DoneIcon>}           
        loading={delConLoading}
        loadingPosition="end"
        onClick={()=>handleRealDelete(item)}
      >Yes</LoadingButton>
    </div>
  </Dialog>
  )
  }
