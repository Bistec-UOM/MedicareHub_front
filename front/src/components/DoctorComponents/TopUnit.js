import React, { useState } from 'react';
import { Typography, Box,  Grid, Card, AppBar, Toolbar, IconButton, Divider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export default function TopUnit(props) {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const [open, setOpen] = useState(false);
  const [filteredAppointmentsdone, setFilteredAppointmentsdone] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    const filteredAppointments = props.appointments.filter(appointment => appointment.status === "done");
    setFilteredAppointmentsdone(filteredAppointments);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCanlenderOpen=()=>
  {

  }


 

  return (
    <>
    
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', p: '15px' }}>
       <Link path to="/dpage"><CalendarTodayIcon sx={{ cursor: 'pointer' }} /></Link> 
        <Typography sx={{ fontWeight: 'Bold', color: 'grey' }}>{formattedDate}</Typography>
        <FormatListBulletedIcon sx={{ cursor: 'pointer' }} onClick={handleClickOpen} />
      </Box>
      
      {open && (
        <> 
             
          <AppBar sx={{  backgroundColor: '#E7FFF9', alignItems: 'center',marginTop:'100px',left:'35%',width:'800px' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="black"
                onClick={handleClose}
                aria-label="close"
                sx={{right:'250px'}}
              >
                <CloseIcon />
              </IconButton>
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <Typography autoFocus color="black" fontWeight={550}>
                  PATIENTS HISTORY
                </Typography>
              </Box>
            </Toolbar>
          </AppBar> 
                       
          <Grid container spacing={5} sx={{justifyContent: 'flex-end', marginTop: '350px', marginLeft: '1900px' }}>
  {filteredAppointmentsdone.map((appointment) => (
    <Grid key={appointment.id} item  sm={100} sx={{ display: 'flex', justifyContent: 'center', }}>      
      <Card style={{width: '950px', display: 'flex', flexDirection: 'row',fontSize: '17px' }}>                          
                          <Typography gutterBottom variant="p" sx={{ flex: '4', marginLeft: '10px' }}>{appointment.patient.name}</Typography>    
                          <Typography gutterBottom variant="p" sx={{ flex: '2', marginLeft: '100px' }}>{appointment.patient.age} years</Typography>    
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '150px' }}>{appointment.patient.gender}</Typography>
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '150px' }}>{appointment.time}</Typography> 
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '140px' }}>Done</Typography>    
                          </Card>
                       </Grid>   
                         ))}
                      </Grid>

        </>
      )}
     
    </>
    
  );
  
}
