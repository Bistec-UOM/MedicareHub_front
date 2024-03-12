import { Typography,Box, TextField,Grid,Card } from '@mui/material';
import React from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

export default function TopUnit() {

//display date
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const [open, setOpen] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const patients=[
    {
    patient:{
      id:1,
      name:"Nethmi Eranga",
      age:23,
      gender:"female"
    },
    time: "13:15",
  },
  {
    patient:{
      id:1,
      name:"Nethmi Eranga",
      age:23,
      gender:"female"
    },
    time: "13:15",
  }
  ]

  
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
      onClose={handleClose}
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
        <Grid container spacing={3} sx={{ marginTop: "5px",}}>
          {patients.map((patient) => (
          
                        <Grid key={patient.patient.id} item xs={12} sm={8} sx={{ marginLeft: '20%', width: 'auto', }}>

                        <Card style={{ display: 'flex', flexDirection: 'row', fontSize: '18px', }}>
                          
                          <Typography gutterBottom variant="p" sx={{ flex: '3', marginLeft: '10px' }}>{patient.patient.name}</Typography>
    
                          <Typography gutterBottom variant="p" sx={{ flex: '2', marginLeft: '50px' }}>{patient.patient.age} years</Typography>
    
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '100px' }}>{patient.patient.gender}</Typography>
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '100px' }}>{patient.time}</Typography>
                          </Card>
                          
                        </Grid>
                         ))}                    
                         </Grid>
                        </Dialog>
      </>
  )
}
