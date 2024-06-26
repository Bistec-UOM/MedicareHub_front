import * as React from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import {  Typography } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { baseURL, endPoints } from "../../../../Services/Appointment";
import { setHeaders } from "../../../../Services/Auth";
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';
import LoadingButton from '@mui/lab/LoadingButton';

export default function DoctorAllAppDeletePopup({
  cancelAll,
  setCancelAll,
  selectedDay,
  delcount,
  setDelcount,
  docid,
  handleNotification,
  dopen,
  setDopen,
  filteredAppointments,
  setFilteredAppointments,
  isDisabledCancel,
  setIsDisabledCancel,
}) {
  const [etimevalueError, seteTimeValueError] = useState(false);

  const [timevalue, setTimeValue] = useState("");
  const [rdelete, setRdelete] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");
  const [allCancelLoading,setAllCancelLoading]=useState(false);  //var for loaidng popup of allcancel button

  //for cancelling all prescheduled appoints of day by doctor
  async function handleAllAppDelete() {
    setAllCancelLoading(true);
    try {
      await axios.put(
        baseURL + endPoints.AppDay + `${docid}` + "/day/" + `${selectedDay}`,setHeaders()
      );
      setAllCancelLoading(false);
      setDelcount(delcount + 1);
      setCancelAll(false);
      handleNotification("All appointment Cancelled succesfully!");
    } catch (err) {
      setAllCancelLoading(false);
      handleNotification("Network Error Occured!", "error");
    }
  }


  const handleClose = () => {
    setCancelAll(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return(
    <Dialog open={cancelAll} onClose={handleClose}>
    <div style={{display:'flex',alignItems:'start',margin:'8px',paddingBottom:'5px',borderBottom:'1px solid lightgrey'}}>
      <WarningIcon color='warning' sx={{mr:'10px'}}></WarningIcon>
      <Typography data-testid="allappcanceltext"> Are you sure the entire list to be Canceled?</Typography>
    </div>
    <div style={{width:'100%',height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button variant='outlined' sx={{mr:'40px'}} size='small' endIcon={<CloseIcon></CloseIcon>} onClick={handleClose} >No</Button>
      <LoadingButton 
        data-testid="allcancelconfirm"
        variant='contained' 
        size='small' 
        endIcon={<DoneIcon></DoneIcon>}           
        loading={allCancelLoading}
        loadingPosition="end"
        onClick={handleAllAppDelete}
      >Yes</LoadingButton>
    </div>
  </Dialog>
  )

 
}
