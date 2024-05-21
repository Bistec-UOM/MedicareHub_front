import React, { useState } from 'react';
import { Typography, Box,  Grid, Card, AppBar, Toolbar, IconButton, Divider, Switch } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export default function TopUnit(props) {
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
    <div style={{position:'relative',width:'100%'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

        <Link path to="/dpage"><CalendarTodayIcon sx={{ cursor: 'pointer',ml:'10px' }} /></Link> 

        <Typography sx={{ fontSize:'14px'}}>{formattedDate}</Typography>

        <FormatListBulletedIcon sx={{ cursor: 'pointer',mr:'10px'}} onClick={handleClickOpen} />
      </Box> 
      <Switch defaultChecked size="small" onChange={props.SwitchOnChange} sx={{position:'relative',top:'10px'}}/>
    </div>   
  );
  
}

{/*
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
              <Box sx={{ width: '100%' }}>
                <Typography autoFocus color="black" fontWeight={550} sx={{ wordSpacing: '0.9em' }}>
                  PATIENTS HISTORY  LIST
                </Typography>
              </Box>
                   </Toolbar>
                    </AppBar>
                                  
                     <Grid container spacing={5} sx={{justifyContent: 'flex-end', marginTop: '940px', marginLeft: '1900px',}}> 

                      {filteredAppointmentsdone.slice().reverse().map((ele) => (
                       <Grid key={ele.id} item  sm={100} sx={{ display: 'flex', justifyContent: 'center', }}>      
                         <Card style={{width: '950px', display: 'flex', flexDirection: 'row',fontSize: '17px' }}>                          
                          <Typography gutterBottom variant="p" sx={{ flex: '3', marginLeft: '10px' }}>{ele.patient.name}</Typography>    
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '100px' }}>{ele.patient.age} years</Typography>    
                          <Typography gutterBottom variant="p" sx={{ flex: '0.5', marginLeft: '150px' }}>{ele.patient.gender}</Typography>
                          <Typography gutterBottom variant="p" sx={{ flex: '0.5', marginLeft: '150px' }}>{ele.time}</Typography> 
                          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '140px' }}>Done</Typography>    
                          </Card>
                       </Grid>   
                         ))}                        
      {/*........................ map damydata set....... just display a list......................................................................... */}
      {/*data.map((appointment) => (
        <Grid key={data.id} item  sm={100} sx={{ display: 'flex', justifyContent: 'center', }}>      
        <Card style={{width: '950px', display: 'flex', flexDirection: 'row',fontSize: '17px' }}>                          
          <Typography gutterBottom variant="p" sx={{ flex: '3', marginLeft: '10px' }}>{appointment.patient.name}</Typography>    
          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '100px' }}>{appointment.patient.age} years</Typography>    
          <Typography gutterBottom variant="p" sx={{ flex: '0.5', marginLeft: '150px' }}>{appointment.patient.gender}</Typography>
          <Typography gutterBottom variant="p" sx={{ flex: '0.5', marginLeft: '150px' }}>{appointment.time}</Typography> 
          <Typography gutterBottom variant="p" sx={{ flex: '1', marginLeft: '140px' }}>Done</Typography>    
          </Card>
       </Grid>   
         ))}

      </Grid>
       

</>
)}
*/}

const data=[
  {
    date:1,
     id:51,  // -----------------------------------> appointment Id-------  
     patient:{
         name:"Nirmala sriyani",
         age:50,
         gender:"female"
       },
       time: "14:15",
       status: "pending"
   },
   {
     date:2,
     id:52,    
     patient:{
         name:"pupudu kasun",
         age:67,
         gender:"male"
       },
       time: "12:50",
       status: "pending"
   },
   {
    date:3,
    id:53,    
    patient:{
        name:"sunil mihiran",
        age:80,
        gender:"male",
      },
      time: "13:15",
      status: "pending"
  },
  {
    date:4,
    id:54,    
    patient:{
        name:"kaumadi piris",
        age:22,
        gender:"female"
      },
      time: "14:00",
      status: "pending"
  },
  {
    date:5,
    id:55,    
    patient:{
        name:"mithila herath",
        age:22,
        gender:"male"
      },
      time: "13:05",
      status: "pending"
  },
  {
    date:6,
    id:56,    
    patient:{
        name:"lakmina chnaditha",
        age:42,
        gender:"female"
      },
      time: "14:15",
      status: "pending"
  },
  {
    date:7,
    id:57,    
    patient:{
        name:"udeshika mendis",
        age:52,
        gender:"female"
      },
      time: "15:00",
      status: "pending"
  },
  {
    date:8,
    id:58,    
    patient:{
        name:"mohomad Iddamalgoda",
        age:38,
        gender:"male"
      },
      time: "15:30",
      status: "pending"
  },
  {
    date:9,
    id:59,    
    patient:{
        name:"Sunilika Perera",
        age:22,
        gender:"male"
      },
      time: "15:45",
      status: "pending"
  },
  {
    date:10,
    id:60,    
    patient:{
        name:"Nimalani Senarathna",
        age:16,
        gender:"male"
      },
      time: "16:00",
      status: "pending"
  },
]
