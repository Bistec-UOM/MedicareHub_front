import React, { useState } from 'react';
import { Typography, Box, Switch } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function TopUnit({setMode,Mode,appointments,SwitchOnChange}) {

  const generatedate=()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()]; // Days of week are also 0-indexed

    return `${year}-${month}-${day} ${dayOfWeek}`;
  }
  const formattedDate = generatedate();
  const [open, setOpen] = useState(false);
  const [filteredAppointmentsdone, setFilteredAppointmentsdone] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
/*     const filteredAppointments = appointments.filter(appointment => appointment.status === "done");
    setFilteredAppointmentsdone(filteredAppointments); */
  };


  return (
    <div style={{position:'relative',width:'100%'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

        {Mode!=2?<EventIcon sx={{ cursor: 'pointer',ml:'10px' }} onClick={()=>setMode(2)} />:<ListAltIcon sx={{ cursor: 'pointer',ml:'10px' }} onClick={()=>setMode(1)}></ListAltIcon>} 

        <Typography sx={{ fontSize:'14px'}}>{formattedDate}</Typography>

        {Mode!=3?<PersonSearchIcon sx={{ cursor: 'pointer',mr:'10px'}} onClick={()=>setMode(3)} />:<ListAltIcon sx={{ cursor: 'pointer',mr:'10px' }} onClick={()=>setMode(1)}></ListAltIcon>}
        
      </Box> 
      <Switch defaultChecked size="small" onChange={SwitchOnChange} sx={{position:'relative',top:'10px'}}/>
    </div>   
  );
  
}

