import React, { useEffect, useState } from 'react'
import { SidebarContainer, SidebarTop, SidebarList } from '../components/sidebar/Sidebar'

import Navbar from '../components/navbar/Navbar'
import { Grid, Card, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import PatientsRecords from '../components/DoctorComponents/PatientsRecords';
import DoctorAddDrugs from '../components/DoctorComponents/DoctorAddDrugs';

export default function Doctor() {
  useEffect(() => {
    document.body.style.margin = '0';

  }, [])

  const Item = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',

  }));

  const load = [
    { name: 'Nethmi Eranga Wijeweera', age: '30', gender: 'Female' },
  ];
  const pres = [
    { name: 'Acetaminophen', quantity: '30', hour: 'BID' },
    { name: 'Acetaminophen', quantity: '30', hour: 'BID' },
    
  ];

 
  const [openPopup, setOpenPopup] = useState(false);

  const handleAddIconClick = () => {
    setOpenPopup(true);
  };

  const [openBox, setOpenBox] = useState(false);

  const handleAddDrugsClick = () => {
    setOpenBox(true);
  };
  return (
    <div>
      <Navbar></Navbar>
      <Grid container spacing={0} sx={{ paddingTop: '64px', height: '100vh' }}>
        <Grid item xs={3} style={{ height: '100%' }}>
          <SidebarContainer>
            <SidebarTop>
            </SidebarTop>
            <SidebarList>
            </SidebarList>
          </SidebarContainer>
        </Grid>
        
        <Grid item xs={9} style={{ height: '100%', overflowY: 'scroll' }}>

          <div>
            {load.map((docdata, id) => (
              <Card key={id} sx={{ maxWidth: '100%', height: '100px' }}>
                <CardContent>
                  <AudioFileIcon sx={{ 
                  color: 'rgb(0, 153, 255)', 
                  float: 'right', 
                  marginRight: '10px', 
                  fontSize: '30px' }} 
                  onClick={handleAddIconClick} />
                  <UpdateIcon sx={{ color: 'rgb(255, 153, 0)', float: 'right', marginRight: '10px', fontSize: '30px' }} />
                  <Typography gutterBottom variant="h6">{docdata.name}</Typography>
                  <Typography gutterBottom variant="p" sx={{ color: '#808080' }}>{docdata.age}  years</Typography><br />
                  <Typography gutterBottom variant="p" sx={{ color: '#808080' }}>{docdata.gender}</Typography>
                </CardContent>
                <PatientsRecords openPopup={openPopup} setOpenPopup={setOpenPopup}/>               
            </Card>
            ))}
          </div>      

         <div>
            {pres.map((drug,num) => (
            <Grid key={num} container spacing={1} sx={{marginTop:"5px",}}>
              <Grid item xs={8}>
              <Item sx={{ backgroundColor: '#0099cc', color: 'white', fontSize: '18px',}}>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '10px', }}>{drug.name}</Typography>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '100px', }}>{drug.quantity} mg</Typography>
                <Typography gutterBottom variant="p" sx={{ marginLeft: '150px', }}>{drug.hour}</Typography>
              </Item>
              </Grid>
              <Grid item xs={4}>
              < DoNotDisturbOnIcon sx={{
                color: 'red', 
                marginLeft: '5px',
                fontSize: '30px',
                float: 'Left' }} />
              </Grid>              
            </Grid>
            ))}
         </div>
         <div>
          < AddCircleIcon sx={{ 
            color: '#00cc66', 
            marginLeft: '10%',
            fontSize: '30px', 
            float: 'Left',
            marginTop: '27px' }}
           onClick={handleAddDrugsClick}/>
          <DoctorAddDrugs openBox={openBox} setOpenBox={setOpenBox} />  
          </div>
          <ThermostatIcon sx={{ color: '#33cc33',
                                marginLeft: '74%', 
                                fontSize: '45px', 
                                 marginTop: '70px' }} />

          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '90%' }, marginLeft: '8%',
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                placeholder="Patient extra details"
                multiline
                rows={7}
                InputProps={{
                style: {
                    backgroundColor: 'rgb(209, 224, 250)',
                    borderRadius: '25px',
                    fontSize: '22px',
                    color:'blue',
                    textAlign:'center',
                },
                }}
                 />
            </Box>
            <br></br>
            <Button variant="contained" sx={{ backgroundColor: '#00cca3', left: '80%' }}>Confirm</Button>
          </div>
        </Grid>
      </Grid>
      </div>
    
  )
}