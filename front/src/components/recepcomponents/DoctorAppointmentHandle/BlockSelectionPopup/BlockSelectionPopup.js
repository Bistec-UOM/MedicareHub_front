import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {  Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from '@mui/icons-material/Warning';
import TodayIcon from '@mui/icons-material/Today';
import LockClockIcon from '@mui/icons-material/LockClock';

//day block popup

export default function BlockSelectionPopup({
  selectedDay,
  doctorId,
  handleNotification,
  item,
  delcount,
  setDelcount,
  blockSelectionPopup,
  setBlockSelectionPopup,
  docDayBlockPopup,
  setDocDayBlockPopup,
  setTimeSelection,
  timeSelection,
  filteredAppointments,
  setFilteredAppointments,
  isDisabled,
  setIsDisabled,
}) {
  const handleClose = () => {
    setBlockSelectionPopup(false);
  };

 



  //addig blocked date and doctor id to the table
 const  handleWholeDayBlock=()=>
 {
  setDocDayBlockPopup(true);
 }

  const handleSelectTime = () => {
    setBlockSelectionPopup(false);
    setTimeSelection(true);
    
  };

  return(
    <Dialog open={blockSelectionPopup} onClose={handleClose}>
    <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
      <Typography> You want Block the whole Day or Specific Time?</Typography>
    </div>
    <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',paddingLeft:'2%'}}>
      <Button data-testid="blockcancelicon" variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >Close</Button>
      <Button data-testid="dayblockicon" variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<TodayIcon></TodayIcon>} onClick={handleWholeDayBlock} >Day</Button>
      <Button data-testid="timeblockicon" variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<LockClockIcon></LockClockIcon>} onClick={handleSelectTime} >Select-Time</Button>
    </div>
  </Dialog>
  )

  
}
