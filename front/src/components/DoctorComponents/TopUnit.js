import { Typography,Box, TextField,Grid,Card } from '@mui/material';
import React, { useState } from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

export default function TopUnit(props) {

//display date
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const [open, setOpen] = React.useState(false);
  const [filteredAppointmentsdone, setFilteredAppointmentsdone] = useState([]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const handleClickOpen = () => {
    setOpen(true);
    const filteredAppointments = props.appointments.filter(appointment => appointment.status === "done");
    setFilteredAppointmentsdone(filteredAppointments);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  
  return (
    <>
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',p:'15px'}}>
        <CalendarTodayIcon sx={{cursor:'pointer'}}></CalendarTodayIcon>
        <Typography sx={{ fontWeight:'Bold',color:'grey' }}>{formattedDate}</Typography>
        <FormatListBulletedIcon sx={{cursor:'pointer'}} onClick={handleClickOpen}></FormatListBulletedIcon>
    </Box>
      <Dialog
      fullScreen
      open={open}     
      TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative',backgroundColor:'#E7FFF9'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="black"
              onClick={handleClose}
              aria-label="close"
            >
            <CloseIcon />
            </IconButton>            
            <Box sx={{ textAlign: 'center', width: '100%',}}>
              <Typography autoFocus color="black" fontWeight={550}>
                TODAY  PATIENTS HISTORY  
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <br></br>       
       
        <TextField   label="Search" sx={{width:'25%', margin: '20px',  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)'}}></TextField>
        <Grid container spacing={5} sx={{ marginTop: "5px",}}>
          {filteredAppointmentsdone.map((appoinment) => (
          
                        <Grid key={appoinment.id} item xs={12} sm={8} sx={{ marginLeft: '20%', width: 'auto', }}>

                        <Card style={{ display: 'flex', flexDirection: 'row', fontSize: '18px', }}>
                          
                          <Typography gutterBottom variant="p" sx={{ flex: '3', marginLeft: '10px' }}>{appoinment.patient.name}</Typography>
    
                          <Typography gutterBottom variant="p" sx={{ flex: '2', marginLeft: '50px' }}>{appoinment.patient.age} years</Typography>
    
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '100px' }}>{appoinment.patient.gender}</Typography>
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '100px' }}>{appoinment.time}</Typography>
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '100px' }}>{appoinment.status}</Typography>
                          </Card>
                          
                        </Grid>
                         ))}                    
                         </Grid>
                        </Dialog>
      </>
  )
}
