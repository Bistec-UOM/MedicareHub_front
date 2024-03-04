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
import PatientsRecords from '../components/DoctorComponents/PatientsRecords';
import DoctorAddDrugs from '../components/DoctorComponents/DoctorAddDrugs';
import AnaliticalReports from '../components/DoctorComponents/AnaliticalReports';
import '../components/CustomScroll.css'
import LabRequest from '../components/DoctorComponents/LabRequest';
import { Sideunit_Patient } from '../components/sidebar/Sideunits';

export default function Doctor() {

  const [select,setSelect]=useState(null);//---------------hold the selected appoinment patient-----------------------------
  const [openPopup, setOpenPopup] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [openpopBox, setOpenpopBox] = useState(false);
  const [openAreports, setOpenAreports] = useState(false);

  useEffect(() => {
    document.body.style.margin = '0';
  }, [])

  const Item = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',

  }));

   const handleAddIconClick = () => {
    setOpenPopup(true);
  }; 

  const handleAddDrugsClick = () => {
    setOpenBox(true);
  }; 

  const handleViewReporsClick = () => {
    setOpenAreports(true);
  };  

  const handleAddButtonClick = () => {
    setOpenpopBox(true);
  };
  
  
 
 //-------------------------->patients appointments Array<--------------------------------------------------------//
  let x=[
    {
      date:1,
      id:51,  // -----------------------------------> appointment Id-------  
      patient:{
          name:"dhgwhjdbjhw",
          age:28,
          gender:"female"
        },
        time: "13:15",
        status: "done"
    },
    {
      date:16,
      id:52,    
      patient:{
          name:"nethmi",
          age:28,
          gender:"female"
        },
        time: "13:15",
        status: "done"
    },
    {
      date:12,
      id:53,    
      patient:{
          name:"eranga",
          age:28,
          gender:"female",
        },
        time: "13:15",
        status: "done"
    },
    {
      date:19,
      id:54,    
      patient:{
          name:"wijeweera",
          age:28,
          gender:"female"
        },
        time: "13:15",
        status: "done"
    },
    {
      date:10,
      id:55,    
      patient:{
          name:"mihiran",
          age:28,
          gender:"female"
        },
        time: "13:15",
        status: "done"
    },
    
  ]
  const selectedAppointment = select ? x.filter(appointment => appointment.id === select) : [];//------------filter  the selected patient----------

  
 return (
  <div>
  <Navbar></Navbar>
  <Grid container spacing={0} sx={{ paddingTop: '64px', height: '100vh' }}>
      <Grid item xs={3} style={{ height: '100%', backgroundColor: '#DEF4F2' }}>
          <SidebarContainer sx={{ backgroundColor: '#DEF4F2' }}>
              <SidebarTop>
              </SidebarTop>
              <SidebarList>
                  {x.map((elm, ind) => {
                      return (
                          <Sideunit_Patient
                              key={ind} id={elm.id} name={elm.patient.name} time={elm["time"]} status={elm["status"]} setSelect={setSelect} selected={elm.id === select ? true : ''}></Sideunit_Patient>
                      );
                  })}
              </SidebarList>
          </SidebarContainer>
      </Grid>

      <Grid item xs={9} style={{ height: '100%', overflowY: 'scroll' }}>
          {select ? (
              <>
                  <div sx={{ display: 'flex' }}>
                      {selectedAppointment.map((index) => (
                          <Card key={index} sx={{ maxWidth: '100%', height: '100px' }}>
                              <CardContent>
                                  <AudioFileIcon sx={{ color: 'rgb(0, 153, 255)', float: 'right', marginRight: '10px', fontSize: '30px', cursor: 'pointer', }} onClick={handleAddIconClick} />
                                  <UpdateIcon sx={{ color: 'rgb(255, 153, 0)', float: 'right', marginRight: '10px', fontSize: '30px', cursor: 'pointer', }} onClick={handleViewReporsClick} />
                                  <AnaliticalReports openAreports={openAreports} setOpenAreports={setOpenAreports} />
                                  <>
                                      <Typography gutterBottom variant="h6">{selectedAppointment[0].patient.name}</Typography>
                                      <Typography gutterBottom variant="p" sx={{ color: '#808080' }}>{selectedAppointment[0].patient.age} years</Typography><br />
                                      <Typography gutterBottom variant="p" sx={{ color: '#808080' }}>{selectedAppointment[0].patient.gender}</Typography>
                                  </>
                              </CardContent>
                              <PatientsRecords openPopup={openPopup} setOpenPopup={setOpenPopup} />
                          </Card>
                      ))}
                  </div>

                  <div>
                      <DoctorAddDrugs openBox={openBox} setOpenBox={setOpenBox} />
                      <AddCircleIcon sx={{ color: '#00cc66', marginLeft: '10%', fontSize: '30px', float: 'left', marginTop: '27px', cursor: 'pointer' }} onClick={handleAddDrugsClick} />
                  </div>
                  <ThermostatIcon sx={{ color: '#33cc33', marginLeft: '74%', fontSize: '45px', marginTop: '48px', cursor: 'pointer' }} onClick={handleAddButtonClick} />
                  <LabRequest openpopBox={openpopBox} setOpenpopBox={setOpenpopBox} />
                  <div sx={{ display: 'flex' }}>
                      <Box
                          component="form"
                          sx={{
                              '& .MuiTextField-root': { m: 1, width: '90%' }, marginLeft: '8%',
                          }}
                          noValidate
                          autoComplete="off">
                          <TextField id="outlined-multiline-flexible" placeholder="Patient extra details" multiline rows={7} InputProps={{ style: { backgroundColor: 'rgb(209, 224, 250)', borderRadius: '25px', fontSize: '22px', color: 'blue', textAlign: 'center', }, }} />
                      </Box>
                      <br></br>
                      <Button variant="contained" sx={{ backgroundColor: '#00cca3', left: '80%' }}>Confirm</Button>
                  </div>
              </>
          ) : (
              <Typography gutterBottom variant="p"></Typography>
          )}
      </Grid>
  </Grid>
</div>    
  )
}